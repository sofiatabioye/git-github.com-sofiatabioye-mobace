import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  deviceId: string;
}

interface RegisterContextProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  submitRegistration: () => Promise<{ success: boolean; message?: string }>;
  verifyEmailCode: (code: string) => Promise<{ success: boolean; message?: string }>;
}

const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    deviceId: ''
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const submitRegistration = async (): Promise<{ success: boolean; message?: string }>  => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      return { success: true, message: "Registration successful! Check your email." };
    } catch (error: unknown) {
      console.error("Registration error:", error);
  
      return {
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred.",
      };
    }
  };

  const verifyEmailCode = async (code: string) => {
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData.email, code }),
      });

      const data = await res.json();
      console.log(data, res)
      if (!res.ok) throw new Error(data.message || "Invalid verification code");

      return { success: true, message: "Email verified successfully!" };
    } catch (error: unknown) {
      console.error("Email verification error:", error);
      return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred." };
    }
  };
  
  return (
    <RegisterContext.Provider value={{ userData, updateUserData, submitRegistration, verifyEmailCode }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister must be used within a RegisterProvider');
  }
  return context;
}
