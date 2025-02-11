import { useState } from "react";
import { Undo, ArrowRight } from "lucide-react";

interface IdentityVerificationProps {
    nextStep: () => void;
    prevStep: () => void;
    title: string;
}

export default function IdentityVerification({ nextStep, prevStep, title }: IdentityVerificationProps) {
    const [selectedMethod, setSelectedMethod] = useState<string | null>("National Identity Number (NIN)");

    return (
        <div className="flex flex-col gap-4 text-center">
            
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-100 text-xs">Select your preferred method of identification.</p>
            
            {/* Verification Methods */}
            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => setSelectedMethod("National Identity Number (NIN)")} 
                    className={`rounded-md p-4 flex justify-between items-center transition-all duration-300 ${selectedMethod === "National Identity Number (NIN)" ? 'bg-white text-black font-bold' : 'bg-[#303030] text-white'}`}
                >
                    National Identity Number (NIN) <ArrowRight className="w-5 h-5" />
                </button>
                <button disabled className="bg-gray-700 text-gray-400 text-left rounded-md p-4 flex justify-between items-center cursor-not-allowed">
                    Driver’s License <ArrowRight className="w-5 h-5" />
                </button>
                <button disabled className="bg-gray-700 text-gray-400 text-left rounded-md p-4 flex justify-between items-center cursor-not-allowed">
                    International Passport <ArrowRight className="w-5 h-5" />
                </button>
            </div>
            
            <button 
                onClick={nextStep} 
                className="w-full font-bold mt-6 py-3 rounded-lg bg-white text-black"
            >
                Proceed to verification
            </button>
        </div>
    );
}
