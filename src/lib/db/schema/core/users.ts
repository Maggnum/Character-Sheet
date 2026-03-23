import { relations } from "drizzle-orm";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { contentPacksTable, userEnabledPacksTable } from "./content-packs";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  contentPacksEnabled: many(userEnabledPacksTable),
  contentPacksCreated: many(contentPacksTable),
}));
