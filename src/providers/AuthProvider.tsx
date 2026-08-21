import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../api/auth";

import { token } from "../storage/token";
import { useCurrentUser } from "../hooks/queries/useCurrentUser";

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const [hasToken, setHasToken] = useState<boolean | null>(null);

  const {
    data: user,
    isLoading: userLoading,
    isError,
    error,
  } = useCurrentUser(hasToken === true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const accessToken = await token.getAccessToken();

        setHasToken(!!accessToken);
      } catch (error) {
        setHasToken(false);
      }
    };

    checkToken();
  }, []);

  const login = async (accessToken: string) => {
    console.log("LOGIN TOKEN:", accessToken);

    await token.setAccessToken(accessToken);

    const savedToken = await token.getAccessToken();

    console.log("TOKEN AFTER SAVING:", savedToken);

    setHasToken(true);

    // Make sure /me runs after the token has been stored
    await queryClient.invalidateQueries({
      queryKey: ["me"],
    });
  };

  const logout = async () => {
    console.log("LOGOUT CALLED");

    try {
      await logoutApi();
    } catch (error) {
      console.log("Logout API failed:", error);
    } finally {
      // Always clear the local session
      await token.clearTokens();

      queryClient.removeQueries({
        queryKey: ["me"],
      });

      setHasToken(false);
    }
  };

  useEffect(() => {
    console.log({
      hasToken,
      isError,
      error,
      user,
    });
  }, [hasToken, isError, error, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: hasToken === true,
        isLoading: hasToken === null || (hasToken && userLoading),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
