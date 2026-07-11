import { Apartment } from "../models/apartment";

export function formatApartment(apartment: Apartment): string {
  const price = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(apartment.price);

  const lines = [
    `🏠 <b>${apartment.title}</b>`,
    `📬 <b>Источник:</b> ${apartment.source}`,
    "",
    `💰 <b>Цена:</b> ${price} $/мес`,
    `📍 <b>Адрес:</b> ${apartment.adress}`,
    `📝 <b>Описание:</b> ${apartment.description}`,
    `📷 <b>Ссылка:</b> ${apartment.link}`,
  ];

  return lines.join("\n");
}
