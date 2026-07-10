import { aggregateApartments } from "./services/aggregator";
import { ApartmentCache } from "./services/apartment-cache";
import { formatApartment } from "./telegram/formatter";
import { sendMessage } from "./telegram/telegram";

async function main() {
  const cache = new ApartmentCache();
  async function check() {
    const apartments = await aggregateApartments();

    const newApartments = cache.getNewApartments(apartments);

    console.log(`Получено: ${apartments.length}`);
    console.log(`Новых: ${newApartments.length}`);
    console.log(newApartments);

    for (const apartment of newApartments) {
      await sendMessage(formatApartment(apartment));
    }
  }

  await check();

  setInterval(check, 30000);
}

main();
