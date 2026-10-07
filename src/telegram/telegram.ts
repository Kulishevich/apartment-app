import "dotenv/config";

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendMessage(text: string) {
  if (!TOKEN || !CHAT_ID) {
    throw new Error("TOKEN or CHAT_ID is not set");
  }
  const response = await fetch(
    `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Telegram sendMessage failed: ${response.status} ${body}`,
    );
  }
}
