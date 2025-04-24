import { createContext, ReactNode, useState, useEffect, useMemo, use } from "react";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  name: string;
}

interface AuthContextType {
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
      }
    }
  }, []);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext value={contextValue}>{children}</AuthContext>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
