import { useQuery } from "@tanstack/react-query";
import { nearbyStations } from "../../api/stations";


export const useStation = () => {
  return useQuery({
    queryKey: ["stations"],
    queryFn: nearbyStations,
    retry: false,
  });
};

