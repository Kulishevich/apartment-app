import { Apartment, ApartmentSource } from "../../models/apartment";
import { OnlinerApartment } from "./types";

export const mapOnlinerApartment = (raw: OnlinerApartment): Apartment => ({
  id: raw.id.toString(),
  source: ApartmentSource.ONLINER,
  title: raw.location.address,
  link: raw.url,
  adress: raw.location.address,
  description: raw.location.address,
  price: Number(raw.price.amount),
  images: [raw.photo],
});
