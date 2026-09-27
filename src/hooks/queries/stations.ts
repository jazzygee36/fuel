import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllStations, nearbyStations } from "../../api/stations";

export const useNearbyStations = (lat?: number, lng?: number) => {
  return useQuery({
    queryKey: ["nearby-stations", lat, lng],
    queryFn: () => nearbyStations(lat!, lng!),
    enabled: lat !== undefined && lng !== undefined,
  });
};

export type AllStationsParams = {
  search?: string;
  fuelType?: string;
  page?: number;
  limit?: number;
};

export const useAllStations = (params: AllStationsParams = {}) => {
  return useQuery({
    queryKey: ["stations", params],
    queryFn: () => getAllStations(params),

    // Keep page 1 visible while page 2 is being fetched
    placeholderData: keepPreviousData,

    staleTime: 30 * 1000,
  });
};
