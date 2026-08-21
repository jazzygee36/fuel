import { FuelProps } from "../utils/types";
import api from "./axios";



export const purchases = async () => {
  const { data } = await api.get("/purchases/history");

  return data;
};

export const purchasesPayment = async (details: FuelProps) => {
  const { data } = await api.post(`/purchases`, details);

  return data;
};
