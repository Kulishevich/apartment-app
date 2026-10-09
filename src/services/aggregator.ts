import "dotenv/config";
import { Apartment } from "../models/apartment";
import { getKufarApartments } from "../parsers/kufar";
import { getOnlinerApartments } from "../parsers/onliner";
import { DEFAULT_FILTERS } from "./defaultFilters";

function readNumber(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) {
    return fallback;
  }

  const value = Number(raw);
  if (Number.isNaN(value)) {
    throw new Error(`${name} должен быть числом, получено "${raw}"`);
  }

  return value;
}

function readRooms(fallback: number[]): number[] {
  const raw = process.env.SEARCH_ROOMS?.trim();
  if (!raw) {
    return fallback;
  }

  const rooms = raw.split(",").map((room) => Number(room.trim()));
  if (rooms.some((room) => Number.isNaN(room))) {
    throw new Error(
      `SEARCH_ROOMS должен быть списком чисел, получено "${raw}"`,
    );
  }

  return rooms;
}

const filters = {
  city: process.env.SEARCH_CITY?.trim() || DEFAULT_FILTERS.city,
  minPrice: readNumber("SEARCH_MIN_PRICE", DEFAULT_FILTERS.minPrice),
  maxPrice: readNumber("SEARCH_MAX_PRICE", DEFAULT_FILTERS.maxPrice),
  rooms: readRooms(DEFAULT_FILTERS.rooms),
  pageSize: readNumber("SEARCH_PAGE_SIZE", DEFAULT_FILTERS.pageSize),
};

export const aggregateApartments = async (): Promise<Apartment[]> => {
  const apartments = await Promise.all([
    getKufarApartments(filters),
    getOnlinerApartments(filters),
  ]);

  return apartments.flat();
};
