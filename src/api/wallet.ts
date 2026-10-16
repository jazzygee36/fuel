import api from "./axios";
interface Data {
  amount: number;
  paymentMethod: string;
  callbackUrl: string;
}

interface FundWalletResponse {
  transactionId: string;
  paymentUrl: string;
  reference: string;
  status: string;
}

export const fundWallet = async (
  payload: Data,
): Promise<FundWalletResponse> => {
  const response = await api.post<FundWalletResponse>(
    "/wallet/fund",
    payload,
  );

  return response.data;
};

export const userWallet = async () => {
  const { data } = await api.get("/wallet/balance");

  return data;
};
