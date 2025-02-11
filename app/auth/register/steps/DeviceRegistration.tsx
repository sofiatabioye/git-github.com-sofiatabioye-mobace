import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useRegister } from "../RegisterContext";

interface DeviceRegistrationProps {
    nextStep: () => void;
    prevStep?: () => void;
    title: string;
}

export default function DeviceRegistration({ nextStep, title }: DeviceRegistrationProps) {
    const [deviceID, setDeviceID] = useState("");

    return (
        <div className="flex flex-col gap-4 text-center">

            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-100 text-xs">Please enter your generator’s unique ID.</p>
            
            {/* Device ID Input */}
            <input
                type="text"
                value={deviceID}
                onChange={(e) => setDeviceID(e.target.value)}
                placeholder="xxxx - xxxx - xxxx - xxxx"
                className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
            />
            
            {/* Info Message */}
            <div className="flex items-center text-left gap-4 text-xs text-white border p-3 rounded-2xl">
                <AlertCircle />
                <span className="text-[9px]">You can find your generator’s unique ID on the packaging container.</span>
            </div>
            
            <button onClick={nextStep} className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg">Register device</button>
        </div>
    );
}
