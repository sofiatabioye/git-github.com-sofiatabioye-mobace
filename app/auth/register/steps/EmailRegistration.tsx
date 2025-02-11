import { useRouter } from "next/navigation";
import { useRegister } from "../RegisterContext";

interface EmailRegistrationProps {
  nextStep: () => void;
  prevStep?: () => void;
  title: string;
}

export default function EmailRegistration({ nextStep, title }: EmailRegistrationProps) {
    const { userData, updateUserData } = useRegister();
    const router = useRouter();
    return (
      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
  
        <input
            type="email"
            value={userData.email}
            onChange={(e) => updateUserData({ email: e.target.value })}
            placeholder="email address"
            className="bg-[#303030] text-white text-center rounded-full p-3 w-full"
        />
  
        <button onClick={nextStep} className="w-full bg-white text-black font-bold mt-6 py-3 rounded-lg">
            Submit
        </button>

        <p className="text-[#8E8E8E] text-xs">
          Do you have an account already? <span className="font-bold text-white cursor-pointer" onClick={() => router.push('/auth/login')}>Log In</span>
        </p>
       
      </div>
    );
  }
  