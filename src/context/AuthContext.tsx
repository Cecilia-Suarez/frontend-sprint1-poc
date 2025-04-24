import { createContext, useState, useEffect, useMemo, PropsWithChildren } from "react";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  name: string;
  role: string;
  email: string;
}

interface AuthContextType {
  authToken?: string | null;
  user?: DecodedToken | null;
  handleLogin: (userToken: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>();
  const [user, setUser] = useState<DecodedToken | null>();

  const handleLogin = (userToken: string) => {
    setAuthToken(userToken);
    localStorage.setItem("userToken", userToken);

    const userData = jwtDecode<DecodedToken>(userToken);
    setUser(userData);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("userToken");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      const token = storedToken;
      setAuthToken(token);

      try {
        const userData = jwtDecode<DecodedToken>(token);
        setUser(userData);
      } catch (error) {
        console.error("Token inválido", error);
        setUser(null);
      }
    }
  }, []);

  const value = useMemo(() => ({ authToken, user, handleLogin, handleLogout }), [authToken, user]);

  return <AuthContext value={value}>{children}</AuthContext>;
};

export { AuthContext };
