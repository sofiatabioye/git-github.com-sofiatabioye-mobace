"use client";

import { useState } from "react";
import { LoginProvider } from "./LoginContext";
import { LoginEmail, LoginPassword, LoginVerification, LoginSuccess } from "./LoginFlow";

export default function LoginPage() {
    return (
        <LoginProvider>
            <LoginFlow />
        </LoginProvider>
    );
}

function LoginFlow() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const steps = [
        { name: "Email", component: <LoginEmail nextStep={nextStep} /> },
        { name: "Password", component: <LoginPassword nextStep={nextStep} prevStep={prevStep} /> },
        // { name: "Verification", component: <LoginVerification nextStep={nextStep} prevStep={prevStep} /> },
        { name: "Success", component: <LoginSuccess /> },
    ];

    return (
        <div className="relative z-10 bg-[#222222] p-16 rounded-2xl shadow-lg max-w-lg w-full text-white">
            {steps[currentStep].component}
        </div>
    );
}

