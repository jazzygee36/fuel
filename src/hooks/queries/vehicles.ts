import { useQuery } from "@tanstack/react-query";
import { getVehicleMakes, getVehicleModels, getVehicles } from "../../api/vehicles";

export const useVehicles = (id?: string) => {
  return useQuery({
    queryKey: ["vehicles", id],
    queryFn: () => getVehicles(id!),
    enabled: !!id,
    retry: false,
  });
};

export const useVehicleMakes = () => {
  return useQuery({
    queryKey: ["vehicle-makes"],
    queryFn: getVehicleMakes,
    retry: false,
  });
};

export const useVehicleModels = (make: string) => {
  return useQuery({
    queryKey: ["vehicle-models", make],
    queryFn: () => getVehicleModels(make),
    enabled: !!make,
    retry: false,
  });
};
