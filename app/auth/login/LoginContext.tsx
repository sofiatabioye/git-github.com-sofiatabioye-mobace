import { createContext, useContext, useState, ReactNode } from "react";

interface LoginData {
    email: string;
    password: string;
    verificationCode: string[];
}

interface LoginContextProps {
    loginData: LoginData;
    updateLoginData: (data: Partial<LoginData>) => void;
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

    return (
        <LoginContext.Provider value={{ loginData, updateLoginData }}>
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
