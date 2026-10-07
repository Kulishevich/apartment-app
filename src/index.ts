import { aggregateApartments } from "./services/aggregator";
import { ApartmentCache } from "./services/apartment-cache";
import { formatApartment } from "./telegram/formatter";
import { sendMessage } from "./telegram/telegram";

async function main() {
  const cache = new ApartmentCache();
  let checking = false;

  async function check() {
    if (checking) {
      return;
    }

    checking = true;

    try {
      const apartments = await aggregateApartments();
      const newApartments = cache.getNewApartments(apartments);

      console.log(`Получено: ${apartments.length}`);
      console.log(`Новых: ${newApartments.length}`);
      console.log(newApartments);

      for (const apartment of newApartments) {
        try {
          await sendMessage(formatApartment(apartment));
          cache.markAsSeen(apartment);
        } catch (error) {
          console.error(
            `Не удалось отправить ${apartment.source}:${apartment.id}`,
            error,
          );
        }
      }
    } catch (error) {
      console.error("Ошибка при проверке объявлений", error);
    } finally {
      checking = false;
    }
  }

  await check();

  setInterval(() => {
    void check();
  }, 30000);
}

main();
