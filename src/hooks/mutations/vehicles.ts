import { useMutation } from "@tanstack/react-query";
import { createVehicles, deleteVehicles } from "../../api/vehicles";
import { token } from "../../storage/token";
import { queryClient } from "../../lib/react-query";

export const useAddVehicles = (id: string) => {
  return useMutation({
    mutationFn: (vehicleData: Parameters<typeof createVehicles>[1]) =>
      createVehicles(id, vehicleData),

    onSuccess: async (data: Awaited<ReturnType<typeof createVehicles>>) => {
      await token.setAccessToken(data.access_token);
    },
  });
};

export const useDeleteVehicle = () => {
  return useMutation({
    mutationFn: (vehicleId: string) => deleteVehicles(vehicleId),

    onSuccess: (_, vehicleId) => {
      queryClient.setQueriesData(
        { queryKey: ["vehicles"] },
        (oldData: any[] | undefined) => {
          if (!oldData) return oldData;

          return oldData.filter((vehicle) => vehicle.id !== vehicleId);
        },
      );

      // Refetch in the background to keep the cache in sync
      queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },
  });
};
