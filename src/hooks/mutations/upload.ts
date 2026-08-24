import { useMutation } from "@tanstack/react-query";
import { filesUploadUrl, filesUpload } from "../../api/upload";


export const useFilesUploadUrl = () => {
  return useMutation({
    mutationFn: filesUploadUrl,
  });
};

export const useFilesUpload = () => {
  return useMutation({
    mutationFn: filesUpload,
  });
};