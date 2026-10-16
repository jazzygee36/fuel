import { useMutation } from "@tanstack/react-query";
import { fundWallet } from "../../api/wallet";

export const useFundWallet = () => {
  return useMutation({
    mutationFn: fundWallet,

    onSuccess: (data) => {
      console.log("Wallet funding response:", data);
    },

    onError: (error) => {
      console.error("Wallet funding failed:", error);
    },
  });
};
