import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env.local",
});

const host = process.env.DB_HOST;
const port = process.env.DB_PORT as unknown;
const database = process.env.DB_NAME;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

if (!host) {
  console.log("⏭️  DB_HOST not defined");
  process.exit(0);
}

if (!port || typeof port !== "number") {
  console.log("⏭️  DB_PORT not defined");
  process.exit(0);
}

if (!database) {
  console.log("⏭️  DB_NAME not defined");
  process.exit(0);
}

if (!user) {
  console.log("⏭️  DB_USERNAME not defined");
  process.exit(0);
}

if (!password) {
  console.log("⏭️  DB_PASSWORD not defined");
  process.exit(0);
}

export default defineConfig({
  schema: "./lib/db/sche",
  out: "./lib/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    user,
    password,
    host,
    port,
    database,
  },
});
