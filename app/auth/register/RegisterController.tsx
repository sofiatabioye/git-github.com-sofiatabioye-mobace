import { useState } from 'react';
import Stepper from './Stepper';
import UserRegistration from './steps/UserRegistration';
import EmailRegistration from './steps/EmailRegistration';
import EmailVerification from './steps/EmailVerification';
import PasswordCreation from './steps/PasswordCreation';
import DeviceRegistration from './steps/DeviceRegistration';
import IdentityVerification from './steps/IdentityVerification';
import IdentityVerification2 from './steps/IdentityVerification2';
import VerificationReview from './steps/VerificationReview';
import { Undo } from 'lucide-react';

const steps = [
  { name: 'User Registration', component: UserRegistration, title: "Let's start by getting to know who you are!" },
  { name: 'Email Registration', component: EmailRegistration, title: "You’re halfway there!" },
  { name: 'Email Verification', component: EmailVerification, title: "The finish line is in sight, you can see it too!" },
  { name: 'Password Creation', component: PasswordCreation, title: "Let’s secure your account now, shall we ?" },
  { name: 'Let’s register your device!', component: DeviceRegistration, title: "" },
  { name: 'Identity Verification', component: IdentityVerification, title: "Great job so far, just one more step to go!" },
  { name: 'Identity Verification', component: IdentityVerification2, title: "The very last step!"},
  { name: 'Verification In Review', component: VerificationReview, title: "" }
];

export default function RegistrationSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const StepComponent = steps[currentStep].component;

  const title = steps[currentStep].title;
  const pageTitle = steps[currentStep].name;

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const showBackButton = currentStep > 0 && currentStep < steps.length - 1;
  const hideStepper = currentStep == steps.length - 1;

  return (
    <div className="relative z-10 bg-[#222222] p-16 rounded-2xl shadow-lg max-w-lg w-full text-white">
      <div className="flex flex-col gap-8 text-center">
 
      {showBackButton && 
        <button onClick={prevStep} className="bg-[#303030] w-fit text-white px-4 py-2 rounded-lg text-xs flex items-center gap-2">
          <Undo className="w-3 h-3" /> Back
        </button>
       }

      <div>
        <p className="text-[#8E8E8E] text-xs text-bold">{title}</p>
        {!hideStepper && <Stepper currentStep={currentStep} totalSteps={steps.length} />}
      </div>

      <StepComponent nextStep={nextStep} prevStep={prevStep} title={pageTitle} />

      </div>
    </div>
  );
}
