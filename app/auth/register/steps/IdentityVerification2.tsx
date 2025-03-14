"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRegister } from "../RegisterContext";

interface IdentityVerificationProps {
  nextStep: () => void;
  prevStep?: () => void;
  title: string;
}

export default function IdentityVerification2({ nextStep, title }: IdentityVerificationProps) {
  const { updateUserData } = useRegister();
  const [nin, setNin] = useState("");
  const [error, setError] = useState("");

  // Function to format input (xxx xxx xxx xx)
  const formatNin = (input: string) => {
    return input
      .replace(/\D/g, "") // Remove non-numeric characters
      .slice(0, 11) // Limit to 11 digits
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1 $2 $3 $4") // Add space formatting
      .trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNin(e.target.value);
    setNin(formatted);
    setError(""); // Clear error when typing
  };

  const handleSubmit = () => {
    const cleanNin = nin.replace(/\s/g, ""); // Remove spaces for validation

    if (cleanNin.length !== 11) {
      setError("NIN must be exactly 11 digits.");
      return;
    }

    updateUserData({ nin: cleanNin }); // Store NIN in RegisterContext
    nextStep(); // Move to next step
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>

      {/* Select Verification Method */}
      <div className="relative w-full py-4">
        <select className="appearance-none bg-[#252525] text-white text-sm text-center rounded-full p-2 w-full pr-10">
          <option>National Identity Number (NIN)</option>
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <ChevronDown className="w-5 h-5 text-white" />
        </div>
      </div>

      <p className="text-white font-bold text-xs">Please enter your NIN</p>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <input
        type="text"
        value={nin}
        onChange={handleChange}
        placeholder="xxx xxx xxx xx"
        className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
      />

      <button
        onClick={handleSubmit}
        disabled={nin.replace(/\s/g, "").length !== 11}
        className={`w-full font-bold mt-6 py-3 rounded-lg transition-all duration-300 ${
          nin.replace(/\s/g, "").length === 11 ? "bg-white text-black" : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
      >
        Verify identity
      </button>
    </div>
  );
}
