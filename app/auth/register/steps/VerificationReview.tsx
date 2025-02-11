import { useRouter } from "next/navigation";

interface VerificationReviewProps {
  nextStep?: () => void;
  title: string;
}

export default function VerificationReview({ title }: VerificationReviewProps) {
  const router= useRouter();
  return (
      <div className="flex flex-col gap-6 items-center text-center p-6">
          {/* Hourglass Image */}
          <img src="/hourglass.png" alt="Verification in progress" className="w-16 h-16" />
          
          {/* Title */}
          <h2 className="text-2xl font-bold">{title}</h2>
          
          {/* Description */}
          <p className="text-white text-xs  max-w-md">
              Your verification credentials are now under review.
              We will get back to you as soon as we have verified them.
          </p>
          
          {/* Proceed Button */}
          <button 
              onClick={() => router.push('/dashboard')} 
             
              className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg max-w-sm"
          >
              Proceed to dashboard
          </button>
      </div>
  );
}
