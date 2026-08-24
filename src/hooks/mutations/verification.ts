import { useMutation } from "@tanstack/react-query";
import { verification } from "../../api/verification";

export const useKycVerification = () => {
  return useMutation({
    mutationFn: verification,
    onSuccess: (data) => {
      console.log("Registration successful", data);
    },
    onError: (error) => {
      console.log("Registration failed", error);
    },
  });
};
