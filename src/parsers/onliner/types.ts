type OnlinerCurrency = "BYN" | "USD" | "EUR" | string;
type OnlinerRentType = "1_room" | "2_rooms" | "3_rooms" | "4_rooms" | string;

interface OnlinerMoney {
  amount: string;
  currency: OnlinerCurrency;
}

interface OnlinerPrice extends OnlinerMoney {
  converted: Partial<Record<OnlinerCurrency, OnlinerMoney>>;
}

interface OnlinerLocation {
  address: string;
  user_address: string;
  latitude: number;
  longitude: number;
}

interface OnlinerContact {
  owner: boolean;
  [key: string]: unknown;
}

export interface OnlinerApartment {
  id: number;
  price: OnlinerPrice;
  rent_type: OnlinerRentType;
  location: OnlinerLocation;
  photo: string;
  contact: OnlinerContact;
  created_at: string;
  last_time_up: string;
  up_available_in: number;
  url: string;
  [key: string]: unknown;
}

interface OnlinerPage {
  limit: number;
  items: number;
  current: number;
  last: number;
}

export interface OnlinerApartmentResponse {
  apartments: OnlinerApartment[];
  total: number;
  page: OnlinerPage;
}
