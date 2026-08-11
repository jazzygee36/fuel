import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/auth";


export const useCurrentUser = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled,
    retry: false,
  });
};

