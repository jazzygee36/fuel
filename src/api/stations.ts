import api from "./axios";

export const nearbyStations = async () => {
  const { data } = await api.get("/stations/nearby");

  return data;
};
