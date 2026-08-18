import { useQuery } from "@tanstack/react-query";
import { nearbyStations } from "../../api/stations";

export const useNearbyStations = (lat?: number, lng?: number) => {
  return useQuery({
    queryKey: ["nearby-stations", lat, lng],
    queryFn: () => nearbyStations(lat!, lng!),
    enabled: lat !== undefined && lng !== undefined,
  });
};
