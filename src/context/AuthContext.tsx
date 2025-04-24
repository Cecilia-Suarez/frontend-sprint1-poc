import { createContext, useState, useLayoutEffect, useMemo, use, PropsWithChildren } from "react";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  name: string;
}

interface AuthContext {
  user?: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<DecodedToken | null>();

  useLayoutEffect(() => {
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
