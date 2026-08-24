import { useMutation } from "@tanstack/react-query";
import {
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyCode,
} from "../../api/auth";
import { useAuth } from "../../providers/AuthProvider";
import { token } from "../../storage/token";

export const useLogin = () => {
  const { login: authenticate } = useAuth();

  return useMutation({
    mutationFn: login,

    onSuccess: async (data: Awaited<ReturnType<typeof login>>) => {
      await authenticate(data.access_token);
    },
  });
};

export const useForgotPwd = () => {
  return useMutation({
    mutationFn: forgetPassword,
  });
};

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyCode,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      await logout();
    },
  });
};

export const useRegistration = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("Registration successful", data);
    },
    onError: (error) => {
      console.log("Registration failed", error);
    },
  });
};
