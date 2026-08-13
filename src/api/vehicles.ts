import api from "./axios";

export const getVehicles = async (id: string) => {
  const { data } = await api.get(`/vehicles/get-vehicles/${id}`);

  return data;
};
