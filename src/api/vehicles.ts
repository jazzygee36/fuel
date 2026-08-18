import { VehicleDto } from "../utils/types";
import api from "./axios";

export const getVehicles = async (id: string) => {
  const { data } = await api.get(`/vehicles/get-vehicles/${id}`);

  return data;
};

export const createVehicles = async (id: string, vehicleData: VehicleDto) => {
  const { data } = await api.post(
    `/vehicles/create-vehicles/${id}`,
    vehicleData,
  );

  return data;
};

export const deleteVehicles = async (vehicleId: string) => {
  const { data } = await api.delete(`/vehicles/${vehicleId}`);

  return data;
};
