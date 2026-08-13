import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { token } from "../storage/token";
import { useCurrentUser } from "../hooks/queries/useCurrentUser";

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const [hasToken, setHasToken] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await token.getAccessToken();

      setHasToken(!!accessToken);
      setCheckingAuth(false);
    };

    checkToken();
  }, []);

  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (hasToken && isError) {
      logout();
    }
  }, [hasToken, isError]);

  const logout = async () => {
    await token.clearTokens();

    queryClient.removeQueries({
      queryKey: ["currentUser"],
    });

    setHasToken(false);
  };

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await token.getAccessToken();
      setHasToken(!!accessToken);
      setCheckingAuth(false);
    };

    checkToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: hasToken,
        isLoading: checkingAuth || (hasToken && isLoading),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
