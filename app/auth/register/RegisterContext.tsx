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
}

interface RegisterContextProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  submitRegistration: () => Promise<{ success: boolean; message?: string }>;
  verifyEmailCode: (code: string) => Promise<{ success: boolean; message?: string }>;
  registerDevice: (deviceId: string) => Promise<{ success: boolean; message?: string }>;
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
    nin: ''
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
      const loginRes = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        email: userData.email,
        password: userData.password, // Using stored password from context
      });
      if (loginRes?.error) {
        throw new Error("Failed to log in automatically. Please log in manually.");
      }
      return { success: true, message: "Email verified successfully!" };
    } catch (error: unknown) {
      console.error("Email verification error:", error);
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
      return { success: true, message: "Device registered successfully!" };
    } catch (error: unknown) {
      console.error("Device registration error:", error);
      return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred." };
    }
  };
  
  return (
    <RegisterContext.Provider value={{ userData, updateUserData, submitRegistration, verifyEmailCode, registerDevice }}>
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
