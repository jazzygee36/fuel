import { AllStationsParams } from "../hooks/queries/stations";
import api from "./axios";

export const nearbyStations = async ({
  latitude,
  longitude,
  radius = 10,
  fuelType,
  search,
  page = 1,
  limit = 10,
}: {
  latitude: number;
  longitude: number;
  radius?: number;
  fuelType?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { data } = await api.get("/stations/nearby", {
    params: {
      lat: latitude,
      lng: longitude,
      radius,
      ...(fuelType && { fuelType }),
      ...(search && { search }),
      page,
      limit,
    },
  });

  return data;
};

export const getAllStations = async (params: AllStationsParams = {}) => {
  const response = await api.get("/stations", {
    params,
  });

  return response.data;
};
