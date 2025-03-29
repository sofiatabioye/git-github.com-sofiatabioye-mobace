import { createContext, useContext, useState, ReactNode } from 'react';
import { signIn } from "next-auth/react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  password: string;
  deviceId: string;
  nin: string;
  registrationProgress: 'started' | 'email-verified' | 'nin-saved' | 'device-registered';
}

interface RegisterContextProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  submitRegistration: () => Promise<{ success: boolean; message?: string }>;
  verifyEmailCode: (code: string) => Promise<{ success: boolean; message?: string }>;
  registerDevice: (deviceId: string) => Promise<{ success: boolean; message?: string }>;
  saveNin: (nin: string) => Promise<{ success: boolean; message?: string }>;
}

const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    deviceId: '',
    userId: '',
    nin: '',
    registrationProgress: 'started'
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
  
      if (!res.ok) throw new Error(data.message || "Invalid verification code");
      
      updateUserData({ userId: data.userId });
      await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: data.userId,
          registrationProgress: "email-verified" 
        }),
      });

      return { success: true, message: "Email verified successfully!" };
    } catch (error: unknown) {
      console.error("Email verification error:", error);
      return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred." };
    }
  };

  const saveNin = async (nin: string) => {
    try {
      const res =  await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData.userId, nin: nin, registrationProgress: "nin-saved" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "NIN saving failed");
      updateUserData({ nin });
      return { success: true, message: "NIN saved successfully!" };
    } catch (error: unknown) {
      console.error("NIN saving error:", error);
      return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred." };
    }
  };
  const generateRandomBatteryPercentage = () => {
    const min = 70;
    const max = 98;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber
  }

  const registerDevice = async (deviceId: string) => {
    try {
      const res = await fetch("/api/devices/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData.userId, id: deviceId, name: `${userData?.firstName}'s First Device`, location: 'Ibadan', batteryPercentage: generateRandomBatteryPercentage(), status: 'active'}),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Device registration failed");

      updateUserData({ deviceId }); // Store device ID in context
      await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: userData.userId,
          registrationProgress: "device-registered"
        }),
      });
      return { success: true, message: "Device registered successfully!" };
    } catch (error: unknown) {
      console.error("Device registration error:", error);
      return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred." };
    }
  };

  
  return (
    <RegisterContext.Provider value={{ userData, updateUserData, submitRegistration, verifyEmailCode, registerDevice, saveNin }}>
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
