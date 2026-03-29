import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({
  path: ".env",
});

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

if (!dbHost) {
  console.log("⏭️  DB_HOST not defined");
  process.exit(0);
}

if (!dbPort) {
  console.log("⏭️  DB_PORT not defined");
  process.exit(0);
}

if (!database) {
  console.log("⏭️  DB_NAME not defined");
  process.exit(0);
}

if (!username) {
  console.log("⏭️  DB_USERNAME not defined");
  process.exit(0);
}

if (!password) {
  console.log("⏭️  DB_PASSWORD not defined");
  process.exit(0);
}

const dbUrl = `https://${dbHost}:${dbPort}`;

const connection = postgres(dbUrl, {
  max: 1,
  username,
  password,
  database,
});
export const db = drizzle(connection);
