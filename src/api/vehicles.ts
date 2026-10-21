import { VehicleDto } from "../utils/types";
import api from "./axios";

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

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

export async function getVehicleMakes() {
  const response = await fetch(
    `${BASE_URL}/GetAllMakes?format=json`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vehicle makes");
  }

  const data = await response.json();

  const makes = (data.Results ?? [])
    .map((item: any) => ({
      label: item.Make_Name,
      value: item.Make_Name,
    }))
    .filter((item: any) => item.label);

  return makes;
}

// Fetch models for the selected vehicle make
export async function getVehicleModels(make: string) {
  if (!make) return [];

  const response = await fetch(
    `${BASE_URL}/GetModelsForMake/${encodeURIComponent(make)}?format=json`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vehicle models");
  }

  const data = await response.json();

  const models = (data.Results ?? [])
    .filter((item: any) => item.Model_Name)
    .map((item: any) => ({
      name: item.Make_Name || make,
      model: item.Model_Name,
    }));

  return models;
}