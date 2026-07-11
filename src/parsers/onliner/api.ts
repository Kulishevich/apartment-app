import axios from "axios";
import { Apartment } from "../../models/apartment";
import { mapOnlinerApartment } from "./mapper";
import { OnlinerApartmentResponse } from "./types";

interface OnlinerSearchFilters {
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
  const onlinerQueryParams = new URLSearchParams();
  const onlinerRoomTypes = rooms?.map((room) => `${room}_rooms`) ?? [];

  for (const roomType of onlinerRoomTypes) {
    onlinerQueryParams.append("rent_type[]", roomType);
  }

  onlinerQueryParams.append("price[min]", minPrice.toString());
  onlinerQueryParams.append("price[max]", maxPrice.toString());
  onlinerQueryParams.append("currency", "USD");
  onlinerQueryParams.append("page", "1");
  onlinerQueryParams.append("v", Math.random().toString());
  onlinerQueryParams.append("limit", pageSize.toString());

  const url = `https://r.onliner.by/sdapi/ak.api/search/apartments?${onlinerQueryParams.toString()}`;

  const response = await axios.get<OnlinerApartmentResponse>(url);

  return response.data.apartments.map(mapOnlinerApartment);
}
