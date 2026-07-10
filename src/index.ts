import { getKufarAds } from "./parsers/kufar";
import { aggregateApartments } from "./services/aggregator";

async function main() {
  const data = await aggregateApartments();

  console.log(data);
}

main();
