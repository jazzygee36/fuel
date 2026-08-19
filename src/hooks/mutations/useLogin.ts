import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { useAuth } from "../../providers/AuthProvider";

export const useLogin = () => {
  const { login: authenticate } = useAuth();

  return useMutation({
    mutationFn: login,

    onSuccess: async (data: Awaited<ReturnType<typeof login>>) => {
      await authenticate(data.access_token);
    },
  });
};