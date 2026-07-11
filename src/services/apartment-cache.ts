import { Apartment } from "../models/apartment";

export class ApartmentCache {
  private initialized = false;

  private readonly seen = new Set<string>();

  private getApartmentKey(apartment: Apartment): string {
    return `${apartment.source}:${apartment.id}`;
  }

  public getNewApartments(apartments: Apartment[]): Apartment[] {
    const result: Apartment[] = [];

    for (const apartment of apartments) {
      const apartmentKey = this.getApartmentKey(apartment);

      if (!this.seen.has(apartmentKey)) {
        this.seen.add(apartmentKey);
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
