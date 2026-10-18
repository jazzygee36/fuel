import api from "./axios";

export const getAdvert = async () => {
  const response = await api.get("promotions/banners");
  return response.data;
};
