import { AllStationsParams } from "../hooks/queries/stations";
import api from "./axios";

export const nearbyStations = async (
  latitude: number,
  longitude: number,
  radius: number = 10,
  fuelType?: string,
) => {
  const { data } = await api.get("/stations/nearby", {
    params: {
      lat: latitude,
      lng: longitude,
      radius,
      ...(fuelType && { fuelType }),
    },
  });

  return data;
};

export const getAllStations = async (
  params: AllStationsParams = {}
) => {
  const response = await api.get("/stations", {
    params,
  });

  return response.data;
};
