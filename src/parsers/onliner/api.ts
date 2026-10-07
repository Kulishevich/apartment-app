import axios from "axios";
import { Apartment } from "../../models/apartment";
import { mapOnlinerApartment } from "./mapper";
import { OnlinerSearchResponse } from "./types";

export interface OnlinerSearchFilters {
  minPrice?: number;
  maxPrice: number;
  rooms?: number[];
  pageSize?: number;
}

export async function getOnlinerApartments({
  minPrice = 1,
  maxPrice = 460,
  rooms,
  pageSize = 30,
}: OnlinerSearchFilters): Promise<Apartment[]> {
  const queryParams = new URLSearchParams();
  const roomTypes =
    rooms?.map((room) => (room === 1 ? "1_room" : `${room}_rooms`)) ?? [];

  for (const roomType of roomTypes) {
    queryParams.append("rent_type[]", roomType);
  }

  queryParams.append("price[min]", minPrice.toString());
  queryParams.append("price[max]", maxPrice.toString());
  queryParams.append("currency", "USD");
  queryParams.append("page", "1");
  queryParams.append("v", Math.random().toString());
  queryParams.append("limit", pageSize.toString());

  const url = `https://r.onliner.by/sdapi/ak.api/search/apartments?${queryParams.toString()}`;

  const response = await axios.get<OnlinerSearchResponse>(url);

  return response.data.apartments.map(mapOnlinerApartment);
}
