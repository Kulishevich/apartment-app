import { Apartment } from "../models/apartment";
import { getKufarAds } from "../parsers/kufar";

const filters = {
  city: "minsk",
  minPrice: 1,
  maxPrice: 460,
  rooms: [2, 3, 4],
  pageSize: 30,
};

export const aggregateApartments = async (): Promise<Apartment[]> => {
  const apartments = await Promise.all([getKufarAds(filters)]);

  return apartments.flat();
};
