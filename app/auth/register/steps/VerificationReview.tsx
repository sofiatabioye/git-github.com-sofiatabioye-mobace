import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRegister } from "../RegisterContext";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface VerificationReviewProps {
  nextStep?: () => void;
  title: string;
}

export default function VerificationReview({ title }: VerificationReviewProps) {
  const router= useRouter();
  const { userData } = useRegister();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const completeRegistration = async () => {
    setLoading(true);
    try {
      // Step 1: update user registrationProgress
      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.userId,
          registrationProgress: "complete",
        }),
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Could not complete registration");
      }

      // Step 2: log in user
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
      });

      if (loginRes?.error) {
        throw new Error("Login failed: " + loginRes.error);
      }

      // Step 3: redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error finishing registration:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-col gap-6 items-center text-center p-6">
          {/* Hourglass Image */}
          <Image src="/hourglass.png" alt="Verification in progress" width={64} height={64} />
          
          {/* Title */}
          <h2 className="text-2xl font-bold">{title}</h2>
          
          {/* Description */}
          <p className="text-white text-xs  max-w-md">
              Your verification credentials are now under review.
              We will get back to you as soon as we have verified them.
          </p>


         {error && <p className="text-red-400">{error}</p>}    
          
          {/* Proceed Button */}
          <button 
              onClick={completeRegistration} 
             
              className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg max-w-sm"
          >
              {loading ? "Completing..." : "Proceed to dashboard"}
          </button>
      </div>
  );
}
