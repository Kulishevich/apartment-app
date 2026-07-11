export enum ApartmentSource {
  KUFAR = "kufar",
  ONLINER = "onliner",
  REALT = "realt",
}

export interface Apartment {
  id: string;
  source: ApartmentSource;
  title: string;
  link: string;
  address: string;
  description: string;
  price: number;
  images: string[];
}
