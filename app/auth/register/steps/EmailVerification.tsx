"use client";

import { useState, useRef } from "react";
import { useRegister } from "../RegisterContext";

interface EmailVerificationProps {
  nextStep: () => void;
  prevStep?: () => void;
  title: string;
}

export default function EmailVerification({ nextStep, title }: EmailVerificationProps) {
  const { userData, verifyEmailCode } = useRegister();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Move focus to the next input field automatically
    if (value && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    setCode([...pastedData, ...Array(6 - pastedData.length).fill('')]);
    pastedData.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = char;
      }
    });
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async () => {
    const enteredCode = code.join("");

    if (enteredCode.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await verifyEmailCode(enteredCode);
    console.log(res)
    if (!res.success) {
      setError(res.message || "Invalid verification code.");
      setLoading(false);
      return;
    }

    nextStep();
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400">
        Please enter the code sent to <span className="font-bold text-white">{userData.email}</span>
      </p>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Code Input */}
      <div className="flex justify-center gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
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
        className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify email"}
      </button>
    </div>
  );
}
