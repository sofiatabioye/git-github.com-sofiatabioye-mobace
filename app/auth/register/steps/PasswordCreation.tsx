import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordCreationProps {
    nextStep: () => void;
    prevStep?: () => void;
    title: string;
}

export default function PasswordCreation({ nextStep, title }: PasswordCreationProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col gap-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-100 text-xs">Please ensure to keep your password safe and hidden.</p>
            
            {/* Password Input */}
            <div className="relative w-full">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
            </div>
            
            {/* Confirm Password Input */}
            <div className="relative w-full">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm Password"
                    className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
            </div>
            
            <button onClick={nextStep} className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg">Verify email</button>
        </div>
    );
}
