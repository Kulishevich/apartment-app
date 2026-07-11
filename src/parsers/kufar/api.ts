import axios from "axios";
import { Apartment } from "../../models/apartment";
import { mapKufarAd } from "./mapper";

interface KufarSearchFilters {
  city: string;
  minPrice?: number;
  maxPrice: number;
  rooms?: number[];
  pageSize?: number;
  typ?: "let" | "sell";
}

export async function getKufarAds({
  city,
  minPrice = 1,
  maxPrice,
  rooms,
  pageSize = 30,
  typ = "let",
}: KufarSearchFilters): Promise<Apartment[]> {
  const queryParams = new URLSearchParams();
  queryParams.append("cat", "1010");
  queryParams.append("cur", "USD");
  queryParams.append(
    "gtsy",
    `country-belarus~province-${city}~locality-${city}`,
  );
  queryParams.append("lang", "ru");
  queryParams.append(
    "prc",
    `r:${minPrice ?? 0},${maxPrice ?? ""}`.replace(/,$/, ""),
  );
  if (rooms?.length) {
    queryParams.append("rms", `v.or:${rooms.join(",")}`);
  }
  queryParams.append("size", pageSize.toString());
  queryParams.append("typ", typ);
  const url = `https://api.kufar.by/search-api/v2/search/rendered-paginated?${queryParams.toString()}`;

  const response = await axios.get(url);

  return response.data.ads.map(mapKufarAd);
}
