import { useMutation } from "@tanstack/react-query";
import { purchasesPayment } from "../../api/purchases";

export const usePurchasePayment = () => {
  return useMutation({
    mutationFn: purchasesPayment,
  });
};
