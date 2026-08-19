import { useMutation } from "@tanstack/react-query";
import { createVehicles, deleteVehicles } from "../../api/vehicles";
import { token } from "../../storage/token";
import { queryClient } from "../../lib/react-query";

export const useAddVehicles = (id: string) => {
  return useMutation({
    mutationFn: (vehicleData: Parameters<typeof createVehicles>[1]) =>
      createVehicles(id, vehicleData),
  });
};

export const useDeleteVehicle = (userId?: string) => {
  return useMutation({
    mutationFn: (vehicleId: string) => deleteVehicles(vehicleId),

    onMutate: async (vehicleId) => {
      await queryClient.cancelQueries({
        queryKey: ["vehicles", userId],
      });

      const previousVehicles = queryClient.getQueryData<any[]>([
        "vehicles",
        userId,
      ]);

      queryClient.setQueryData<any[]>(
        ["vehicles", userId],
        (oldVehicles = []) =>
          oldVehicles.filter((vehicle) => vehicle.id !== vehicleId)
      );

      return { previousVehicles };
    },

    onError: (_error, _vehicleId, context) => {
      queryClient.setQueryData(
        ["vehicles", userId],
        context?.previousVehicles
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles", userId],
      });
    },
  });
};