import { VerificationProps } from "../utils/types";
import api from "./axios";

export const verification = async (payload: VerificationProps) => {
  const { data } = await api.post("/kyc/documents", payload);

  return data;
};
