import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getCurrentUserId } from "../../api/auth";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export const useCurrentUserId = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUserId,
    retry: false,
  });
};
