import { useQuery } from "@tanstack/react-query";
import { getAdvert } from "../../api/advert";

export const useAdvert = () => {
  return useQuery({
    queryKey: ["advert"],
    queryFn: getAdvert,

    retry: false,
  });
};
