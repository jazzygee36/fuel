import api from "./axios";

export const userWallet = async () => {
  const { data } = await api.get("/wallet/balance");

  return data;
};
