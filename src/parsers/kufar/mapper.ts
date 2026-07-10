import { KufarAd } from "./types";
import { Apartment } from "../../models/apartment";

export const mapKufarAd = (raw: KufarAd): Apartment => ({
  id: raw.ad_id.toString(),
  title: raw.subject,
  link: raw.ad_link,
  adress: raw.account_parameters[0].v as string,
  description: raw.body_short,
  price: Number(raw.price_usd) / 100,
  images: raw.images.map(
    (image) => `https://rms.kufar.by/v1/list_thumbs_2x/${image.path}`,
  ),
});
