import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage} from "./useLocalStorage";


interface AuthContextType {
  userData: string | null;
  login: (userData: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({children}) => {
  const [userData, setUserData, clearUserData] = useLocalStorage<string | null>("userData", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (userData: string): Promise<void> => {
    setUserData(userData);
    navigate("/dashboard");
  };

  // call this function to sign out logged in user
  const logout = (): void => {
    setUserData(null);
    navigate("/", { replace: true });
  };

  const value = useMemo<AuthContextType>(
    () => ({
      userData,
      login,
      logout,
    }),
    [userData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
