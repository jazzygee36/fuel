import { useQuery } from "@tanstack/react-query";
import { getAllStations, nearbyStations } from "../../api/stations";

export const useNearbyStations = (lat?: number, lng?: number) => {
  return useQuery({
    queryKey: ["nearby-stations", lat, lng],
    queryFn: () => nearbyStations(lat!, lng!),
    enabled: lat !== undefined && lng !== undefined,
  });
};

export const useAllStations = (enabled = true) => {
  return useQuery({
    queryKey: ["stations"],
    queryFn: getAllStations,
    enabled,
    retry: false,
  });
};
