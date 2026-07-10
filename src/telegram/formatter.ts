import { Apartment } from "../models/apartment";

export function formatApartment(apartment: Apartment): string {
  const price = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(apartment.price);

  const imageLinks = apartment.images.slice(0, 3).join("\n");

  const lines = [
    `🏠 <b>${apartment.title}</b>`,
    "",
    `💰 <b>Цена:</b> ${price} $/мес`,
    `📍 <b>Адрес:</b> ${apartment.adress}`,
    `📝 <b>Описание:</b> ${apartment.description}`,
    "",
    `🔗 <a href="${apartment.link}">Открыть объявление</a>`,
  ];

  if (imageLinks) {
    lines.push("", imageLinks);
  }

  return lines.join("\n");
}
