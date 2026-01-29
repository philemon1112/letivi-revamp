import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Professional } from "@/types/common/professional";


interface AuthContextType {
  user: Professional | null;
  setUser: React.Dispatch<React.SetStateAction<Professional | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<Professional | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get("USER");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
