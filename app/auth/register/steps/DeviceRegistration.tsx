"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useRegister } from "../RegisterContext";

interface DeviceRegistrationProps {
  nextStep: () => void;
  prevStep?: () => void;
  title: string;
}

export default function DeviceRegistration({ nextStep, title }: DeviceRegistrationProps) {
  const { registerDevice } = useRegister();
  const [deviceID, setDeviceID] = useState("");
  const [error, setError] = useState("");

  // Function to format input with spaces (xxxx - xxxx - xxxx - xxxx)
  const formatDeviceID = (input: string) => {
    return input
      .replace(/\D/g, "") // Remove non-numeric characters
      .slice(0, 16) // Limit to 16 digits
      .replace(/(\d{4})/g, "$1 ") // Add space every 4 digits
      .trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDeviceID(e.target.value);
    setDeviceID(formatted);
    setError(""); // Clear error on input change
  };

  const handleSubmit = async () => {
    const cleanDeviceID = deviceID.replace(/\s/g, ""); // Remove spaces for validation

    if (cleanDeviceID.length !== 16) {
      setError("Device ID must be exactly 16 digits.");
      return;
    }

    const res = await registerDevice(cleanDeviceID);
    if (!res.success) {
      setError(res.message || "Failed to register device.");
      return;
    }

    nextStep(); // Move to next step if successful
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-100 text-xs">Please enter your generator’s unique ID.</p>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Device ID Input */}
      <input
        type="text"
        value={deviceID}
        onChange={handleChange}
        placeholder="xxxx - xxxx - xxxx - xxxx"
        className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
      />

      {/* Info Message */}
      <div className="flex items-center text-left gap-4 text-xs text-white border p-3 rounded-2xl">
        <AlertCircle />
        <span className="text-[9px]">
          You can find your generator’s unique ID on the packaging container.
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg"
      >
        Register device
      </button>
    </div>
  );
}
