import { useMutation } from "@tanstack/react-query";
import { filesUploadUrl, selfieVerification, verification } from "../../api/verification";

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

export const useSelfieVerification = () => {
  return useMutation({
    mutationFn: selfieVerification,
    onSuccess: (data) => {
      console.log("selfieVerification", data);
    },
    onError: (error) => {
      console.log("selfieVerification failed", error);
    },
  });
};

export const useFilesUploadUrl = () => {
  return useMutation({
    mutationFn: filesUploadUrl,
  });
};
