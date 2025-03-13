"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "../RegisterContext";

interface UserRegistrationProps {
  nextStep: () => void;
  title: string;
}

export default function UserRegistration({ nextStep, title }: UserRegistrationProps) {
  const { userData, updateUserData } = useRegister();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!userData.firstName.trim() || !userData.lastName.trim()) {
      setError("Both first and last name are required.");
      return;
    }

    setError(""); // Clear error if valid
    nextStep(); // Move to the next step
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <input
        type="text"
        value={userData.firstName}
        onChange={(e) => updateUserData({ firstName: e.target.value })}
        placeholder="First Name"
        className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
      />

      <input
        type="text"
        value={userData.lastName}
        onChange={(e) => updateUserData({ lastName: e.target.value })}
        placeholder="Last Name"
        className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg"
      >
        Submit
      </button>

      <p className="text-[#8E8E8E] text-xs">
        Do you have an account already?{" "}
        <span className="font-bold text-white cursor-pointer" onClick={() => router.push('/auth/login')}>
          Log In
        </span>
      </p>
    </div>
  );
}
