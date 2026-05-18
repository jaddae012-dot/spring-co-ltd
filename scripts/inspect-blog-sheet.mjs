import fs from "node:fs";
import { google } from "googleapis";

function parseEnvFile(text) {
  const out = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function main() {
  const envText = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const env = parseEnvFile(envText);

  const spreadsheetId = env.GOOGLE_SHEET_ID || env.GOOGLE_SPREADSHEETS_ID;
  if (!spreadsheetId) {
    console.error("Missing GOOGLE_SHEET_ID/GOOGLE_SPREADSHEETS_ID in .env.local");
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "properties.title,sheets.properties.title",
  });

  console.log(`Spreadsheet: ${res.data.properties?.title ?? "(unknown)"}`);
  console.log("Tabs:");
  for (const sheet of res.data.sheets ?? []) {
    console.log(`- ${sheet.properties?.title ?? "(untitled)"}`);
  }
}

main().catch((err) => {
  console.error("ERROR", err?.message ?? err);
  process.exit(1);
});
