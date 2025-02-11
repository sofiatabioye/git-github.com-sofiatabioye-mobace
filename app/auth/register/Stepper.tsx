interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
    const maxVisibleSteps = 4; 
    const startIndex = Math.max(0, Math.min(currentStep, totalSteps - maxVisibleSteps));
    const visibleSteps = Array.from({ length: Math.min(maxVisibleSteps, totalSteps) }, (_, i) => startIndex + i);

    return (
      <div className="flex items-center justify-center gap-2 w-full my-2">
       {visibleSteps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-16 h-1 ${step <= currentStep ? 'bg-white' : 'bg-[#333333]'}`}></div>
        </div>
      ))}
      </div>
    );
  }
  