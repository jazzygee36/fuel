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

  const {
    data: user,
    isLoading,
    isError,
  } = useCurrentUser({
    enabled: hasToken,
  });

  console.log({
    hasToken: hasToken,
    checkingAuth,
    queryLoading: isLoading,
  });
  useEffect(() => {
    if (hasToken && isError) {
      logout();
    }
  }, [hasToken, isError]);

  const logout = async () => {
    await token.clear();

    queryClient.removeQueries({
      queryKey: ["currentUser"],
    });

    setHasToken(false);
  };

  useEffect(() => {
    console.log("Effect fired");

    const checkToken = async () => {
      console.log("Before getAccessToken");

      const accessToken = await token.getAccessToken();

      console.log("After getAccessToken");

      setHasToken(!!accessToken);

      console.log("Before setCheckingAuth");

      setCheckingAuth(false);

      console.log("After setCheckingAuth");
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
