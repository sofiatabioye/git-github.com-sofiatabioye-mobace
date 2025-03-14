import { createContext, useContext, useState, ReactNode } from "react";
import { signIn } from "next-auth/react";

interface LoginData {
    email: string;
    password: string;
    verificationCode: string[];
}

interface LoginContextProps {
    loginData: LoginData;
    updateLoginData: (data: Partial<LoginData>) => void;
    loginUser: () => Promise<{ success: boolean; message?: string }>;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
        verificationCode: ["", "", "", "", "", ""],
    });

    const updateLoginData = (data: Partial<LoginData>) => {
        setLoginData((prev) => ({ ...prev, ...data }));
    };

    const loginUser = async () => {
        try {
          // Check if email, password, and code are provided
          if (!loginData.email.trim()) throw new Error("Email is required.");
          if (!loginData.password.trim()) throw new Error("Password is required.");
            //   if (loginData.verificationCode.some((digit) => digit === "")) {
            //     throw new Error("Please enter the 6-digit verification code.");
            //   }
    
          // Perform login request
          const res = await signIn("credentials", {
            redirect: false,
            email: loginData.email,
            password: loginData.password,
          });
    
          if (res?.error) {
            throw new Error(res.error || "Login failed. Please check your credentials.");
          }
    
          return { success: true, message: "Login successful!" };
        } catch (error: unknown) {
          return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred." };
        }
      };

    return (
        <LoginContext.Provider value={{ loginData, updateLoginData, loginUser }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
}
