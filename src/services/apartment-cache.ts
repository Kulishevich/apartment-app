import { Apartment } from "../models/apartment";

export class ApartmentCache {
  private initialized = false;

  private readonly seen = new Set<string>();

  private getApartmentKey(apartment: Apartment): string {
    return `${apartment.source}:${apartment.id}`;
  }

  public getNewApartments(apartments: Apartment[]): Apartment[] {
    const unseen = apartments.filter(
      (apartment) => !this.seen.has(this.getApartmentKey(apartment)),
    );

    if (!this.initialized) {
      for (const apartment of unseen) {
        this.markAsSeen(apartment);
      }
      this.initialized = true;
      return [];
    }

    return unseen;
  }

  public markAsSeen(apartment: Apartment): void {
    this.seen.add(this.getApartmentKey(apartment));
  }
}
