import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../../api/vehicles";

export const useVehicles = (id?: string) => {
  return useQuery({
    queryKey: ["vehicles", id],
    queryFn: () => getVehicles(id!),
    enabled: !!id,
    retry: false,
  });
};