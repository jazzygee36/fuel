import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { useQueryClient } from "@tanstack/react-query";
import { authEvents, logout as logoutApi } from "../api/auth";

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

  const { data: user, isLoading: userLoading } = useCurrentUser(
    hasToken === true,
  );

  // Check if a token already exists when the app starts
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

  // LOGIN
  const login = async (accessToken: string) => {
    console.log("LOGIN TOKEN:", accessToken);

    await token.setAccessToken(accessToken);

    const savedToken = await token.getAccessToken();

    setHasToken(true);

    await queryClient.invalidateQueries({
      queryKey: ["me"],
    });
  };

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.log("Logout API failed:", error);
    } finally {
      // Always clear local authentication
      await token.clearTokens();

      // Remove cached user
      queryClient.removeQueries({
        queryKey: ["me"],
      });

      // Update authentication state
      setHasToken(false);
    }
  }, [queryClient]);

  // Handle forced logout from Axios interceptor
  useEffect(() => {
    const unsubscribe = authEvents.setLogoutListener(() => {
      token.clearTokens().then(() => {
        queryClient.removeQueries({
          queryKey: ["me"],
        });

        setHasToken(false);
      });
    });

    return unsubscribe;
  }, [queryClient]);

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
