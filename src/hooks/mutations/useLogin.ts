import { useMutation } from "@tanstack/react-query";
import { token } from "../../storage/token";
import { login } from "../../api/auth";


export const useLogin = () => {
  return useMutation({
    mutationFn: login,

    onSuccess: async (data: Awaited<ReturnType<typeof login>>) => {
      await token.setAccessToken(data.access_token);
    },
  });
};