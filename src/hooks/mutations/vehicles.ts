import { useMutation } from "@tanstack/react-query";
import { createVehicles, deleteVehicles } from "../../api/vehicles";
import { queryClient } from "../../lib/react-query";

export const useAddVehicles = (id: string) => {
  return useMutation({
    mutationFn: (vehicleData: Parameters<typeof createVehicles>[1]) =>
      createVehicles(id, vehicleData),

    onSuccess: async () => {
      // Refresh the vehicle list immediately after a successful addition
      await queryClient.invalidateQueries({
        queryKey: ["vehicles", id],
      });

      // Refresh the user's details if they also depend on vehicle data
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
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
          oldVehicles.filter((vehicle) => vehicle.id !== vehicleId),
      );

      return { previousVehicles };
    },

    onError: (_error, _vehicleId, context) => {
      queryClient.setQueryData(["vehicles", userId], context?.previousVehicles);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles", userId],
      });
    },
  });
};
