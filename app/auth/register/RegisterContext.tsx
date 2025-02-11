import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterContextProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  return (
    <RegisterContext.Provider value={{ userData, updateUserData }}>
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
