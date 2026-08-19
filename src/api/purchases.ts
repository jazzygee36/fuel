import api from "./axios";

export const purchases = async () => {
  const { data } = await api.get("/purchases/history");

  return data;
};
