import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllStations, nearbyStations } from "../../api/stations";

export const useNearbyStations = ({
  latitude,
  longitude,
  radius = 10,
  fuelType,
  search,
  page = 1,
  limit = 10,
}: {
  latitude?: number;
  longitude?: number;
  radius?: number;
  fuelType?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [
      "nearby-stations",
      latitude,
      longitude,
      radius,
      fuelType,
      search,
      page,
      limit,
    ],

    queryFn: () =>
      nearbyStations({
        latitude: latitude!,
        longitude: longitude!,
        radius,
        fuelType,
        search,
        page,
        limit,
      }),

    enabled: latitude !== undefined && longitude !== undefined,
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
