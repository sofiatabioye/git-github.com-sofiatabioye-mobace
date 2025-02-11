import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface IdentityVerificationProps {
    nextStep: () => void;
    prevStep?: () => void;
    title: string;
}

export default function IdentityVerification2({ nextStep, title }: IdentityVerificationProps) {
    const [nin, setNin] = useState("");

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
            <input 
                type="text" 
                value={nin} 
                onChange={(e) => setNin(e.target.value)}
                placeholder="xxxx - xxxx - xxxx - xxxx" 
                className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
            />
            
            <button 
                onClick={nextStep} 
                disabled={!nin}
                className={`w-full font-bold mt-6 py-3 rounded-lg transition-all duration-300 ${nin ? 'bg-white text-black' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
            >
                Verify identity
            </button>
        </div>
    );
}