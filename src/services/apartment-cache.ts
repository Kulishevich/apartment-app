import { Apartment } from "../models/apartment";

export class ApartmentCache {
  private initialized = false;

  private readonly seen = new Set<string>();

  public getNewApartments(apartments: Apartment[]): Apartment[] {
    const result: Apartment[] = [];

    for (const apartment of apartments) {
      if (!this.seen.has(apartment.id)) {
        this.seen.add(apartment.id);
        result.push(apartment);
      }
    }

    if (!this.initialized) {
      this.initialized = true;
      return [];
    }

    return result;
  }
}
