import { useMutation } from "@tanstack/react-query";
import { filesUploadUrl, selfieVerification, verification } from "../../api/verification";

export const useKycVerification = () => {
  return useMutation({
    mutationFn: verification,
    onSuccess: (data) => {
      console.log("Registration successful", data);
    },
    onError: (error) => {
      reportError( error);
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
      reportError( error);
    },
  });
};

export const useFilesUploadUrl = () => {
  return useMutation({
    mutationFn: filesUploadUrl,
  });
};
