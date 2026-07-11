import { Apartment } from "../models/apartment";
import { getKufarApartments } from "../parsers/kufar";
import { getOnlinerApartments } from "../parsers/onliner";

const kufarFilters = {
  city: "minsk",
  minPrice: 1,
  maxPrice: 460,
  rooms: [2, 3, 4],
  pageSize: 10,
};

const onlinerFilters = {
  minPrice: 1,
  maxPrice: 460,
  rooms: [2, 3, 4],
  pageSize: 10,
};

export const aggregateApartments = async (): Promise<Apartment[]> => {
  const apartments = await Promise.all([
    getKufarApartments(kufarFilters),
    getOnlinerApartments(onlinerFilters),
  ]);

  return apartments.flat();
};
