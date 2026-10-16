import api from "./axios";

export const getAdvert = async () => {
  const response = await api.get("admin/advert");
  return response.data;
};
