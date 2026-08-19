import { useQuery } from "@tanstack/react-query";
import { purchases } from "../../api/purchases";

export const usePurchases = (enabled = true) => {
  return useQuery({
    queryKey: ["purchase"],
    queryFn: purchases,
    enabled,
    retry: false,
  });
};
