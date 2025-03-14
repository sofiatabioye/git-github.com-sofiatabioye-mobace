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
    const [email, setEmail] = useState(loginData.email);
    const [error, setError] = useState("");
    const router = useRouter();
  
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      updateLoginData({ email: e.target.value });
      setError("");
    };
  
    const handleSubmit = () => {
      if (!email.trim()) {
        setError("Email is required.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
  
      nextStep();
    };
  
    return (
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <p className="text-white text-xs">Please enter your registered email address.</p>
  
        {error && <p className="text-red-400 text-sm">{error}</p>}
  
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="email address"
          className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
        />
  
        <button onClick={handleSubmit} className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg">
          Proceed
        </button>
      </div>
    );
}

export function LoginPassword({ nextStep, prevStep }: LoginProps) {
    const { loginData, updateLoginData } = useLogin();
    const [password, setPassword] = useState(loginData.password);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginUser } = useLogin();
  
    const validatePassword = (password: string) => {
      if (password.length < 8) return "Password must be at least 8 characters.";
      if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
      if (!/\d/.test(password)) return "Password must contain at least one number.";
      return "";
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      updateLoginData({ password: newPassword });
      setError(validatePassword(newPassword)); // Validate dynamically
    };
  
    const handleSubmit = async () => {
      const validationError = validatePassword(password);
      if (validationError) {
        setError(validationError);
        return;
      }

      const res = await loginUser();
      if (!res.success) {
        setError(res.message || "Login failed.");
        setLoading(false);
        return;
      }
    
      
      nextStep();
    };
  
    return (
      <div className="flex flex-col gap-6 text-center">
        <button onClick={prevStep} className="bg-[#303030] w-fit text-white px-4 py-2 rounded-md text-xs flex items-center gap-2">
          <Undo className="w-4 h-4" /> Back
        </button>
  
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <p className="text-white text-xs">Please enter your password.</p>
  
        {error && <p className="text-red-400 text-sm">{error}</p>}
  
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
  
        <button 
          onClick={handleSubmit} 
          disabled={!!error || loading} 
          className={`w-full font-bold mt-6 py-3 rounded-lg transition-all duration-300 ${
            error ? "bg-gray-500 text-gray-300 cursor-not-allowed" : "bg-white text-black"
          }`}
        >
          Log In
        </button>
      </div>
    );
  }
  


export function LoginVerification({ nextStep, prevStep }: LoginProps) {
    const { loginData, updateLoginData } = useLogin();
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginUser } = useLogin();

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

    const handleSubmit = async () => {
        const enteredCode = loginData.verificationCode.join("");
      
        if (enteredCode.length < 6) {
          setError("Please enter all 6 digits.");
          return;
        }
      
        setLoading(true);
        setError("");
      
        const res = await loginUser();
        if (!res.success) {
          setError(res.message || "Login failed.");
          setLoading(false);
          return;
        }
      
        nextStep(); // Proceed to login success step
      };

    return (
        <div className="flex flex-col gap-4 text-center">
            <button onClick={prevStep} className="bg-[#303030] w-fit text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <Undo className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-bold">Email Verification</h2>
            <p className="text-gray-400">Please enter the code sent to <span className="font-bold text-white">{loginData.email}</span></p>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

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
                onClick={handleSubmit}
                disabled={!loginData.verificationCode.every((digit) => digit !== "") || loading}
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
