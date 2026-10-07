import { SelfieVerificationProps, VerificationProps } from "../utils/types";
import api from "./axios";

interface UrlProps {
  purpose: string;
  fileName: string;
  contentType: string;
}

export const verification = async (payload: VerificationProps) => {
  const { data } = await api.post("/kyc/documents", payload);

  return data;
};


export const selfieVerification = async (payload: SelfieVerificationProps) => {
  const { data } = await api.post("/kyc/selfie", payload);

  return data;
};

export const filesUploadUrl = async (props: UrlProps) => {
  const { data } = await api.post(`files/upload-url`, props);
  return data;
};


