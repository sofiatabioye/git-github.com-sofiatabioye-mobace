import { useRef, useState } from "react";
import { Undo, Eye, EyeOff } from "lucide-react";
import { useLogin } from "./LoginContext";
import { useRouter } from "next/navigation";
import Image from "next/image";


interface LoginProps {
    nextStep: () => void;
    prevStep?: () => void;
}

export function LoginEmail({ nextStep }: LoginProps) {
    const { loginData, updateLoginData } = useLogin();
    const [email, setEmail] = useState(loginData.email); // Initialize with context data
    const router= useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value); // Update local state
        updateLoginData({ email: e.target.value }); // Update global context
    };

    return (
        <div className="flex flex-col gap-6 text-center">
            <p className="text-[#8E8E8E] text-xs font-bold">Pick up where you left off!</p>
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <p className="text-white text-xs">Please enter your registered email address.</p>
            <input 
                type="email" 
                value={email} 
                onChange={handleChange}
                placeholder="email address" 
                className="bg-[#303030] text-white text-center rounded-full p-3 w-full" 
            />
            <button 
                onClick={nextStep} 
                className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg"
            >
                Proceed
            </button>
            <p className="text-[#8E8E8E] text-xs">You don’t have an account? <span className="font-bold text-white cursor-pointer" onClick={() => router.push('/auth/register')}>Sign Up</span></p>
        </div>
    );
}


export function LoginPassword({ nextStep, prevStep }: LoginProps) {
    const { loginData, updateLoginData } = useLogin();
    const [password, setPassword] = useState(loginData.password);
    const [showPassword, setShowPassword] = useState(false);
    const router= useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        updateLoginData({ password: e.target.value });
    };

    return (
        <div className="flex flex-col gap-6 text-center">
            <button onClick={prevStep} className="bg-[#303030] w-fit text-white px-4 py-2 rounded-md text-xs flex items-center gap-2">
                <Undo className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <p className="text-white text-xs">Please enter your password.</p>
            <div className="relative w-full">
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={handleChange}
                    placeholder="password" 
                    className="bg-[#303030] text-white text-center rounded-full p-3 w-full" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
            </div>
            <p className="text-white text-xs cursor-pointer">Forgot Password?</p>
            <button 
                onClick={nextStep} 
                className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg"
            >
                Log In
            </button>
            <p className="text-[#8E8E8E] text-xs">You don’t have an account? <span className="font-bold text-white cursor-pointer" onClick={() => router.push('/auth/register')}>Sign Up</span></p>
        </div>
    );
}


export function LoginVerification({ nextStep, prevStep }: LoginProps) {
    const { loginData, updateLoginData } = useLogin();
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...loginData.verificationCode];
        newCode[index] = value;
        updateLoginData({ verificationCode: newCode });

        // Move focus to the next input field
        if (value && index < newCode.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
        updateLoginData({ verificationCode: [...pastedData, ...Array(6 - pastedData.length).fill("")] });

        pastedData.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index]!.value = char;
            }
        });

        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    return (
        <div className="flex flex-col gap-4 text-center">
            <button onClick={prevStep} className="bg-[#303030] w-fit text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <Undo className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-bold">Email Verification</h2>
            <p className="text-gray-400">Please enter the code sent to <span className="font-bold text-white">{loginData.email}</span></p>

            <div className="flex justify-center gap-2">
                {loginData.verificationCode.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onPaste={handlePaste}
                        className="bg-[#303030] text-white text-center rounded-md p-3 w-12 h-12 text-xl font-bold"
                    />
                ))}
            </div>

            <p className="text-gray-400 text-sm">
                I didn’t get a code. <span className="font-bold text-white cursor-pointer">Resend code</span>
            </p>

            <button
                onClick={nextStep}
                disabled={!loginData.verificationCode.every((digit) => digit !== "")}
                className={`w-full font-bold mt-6 py-3 rounded-lg transition-all duration-300 ${
                    loginData.verificationCode.every((digit) => digit !== "") ? "bg-white text-black" : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
            >
                Verify email
            </button>
        </div>
    );
}


export function LoginSuccess() {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-6 items-center text-center">
            <Image src="/hourglass.png" alt="Login successful" width={64} height={64} />
            <h2 className="text-xl font-bold">Log In Successful!</h2>
            <button 
                onClick={() => router.push("/dashboard")}
                className="w-full bg-white text-black text-xs font-bold mt-6 py-3 rounded-lg max-w-lg"
            >
                Proceed to dashboard
            </button>
        </div>
    );
}
