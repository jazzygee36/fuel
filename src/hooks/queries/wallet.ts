import { useQuery } from "@tanstack/react-query";
import { userWallet } from "../../api/wallet";


export const useWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: userWallet,
    retry: false,
  });
};

