import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getCurrentUserId } from "../../api/auth";

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled,
    retry: false,
  });
};

export const useCurrentUserId = () => {
  return useQuery({
    queryKey: ["current-user-id"],
    queryFn: getCurrentUserId,
    retry: false,
  });
};
