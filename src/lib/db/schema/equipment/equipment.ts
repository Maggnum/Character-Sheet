import { boolean, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { currencyTable } from "./currency";
import { contentPacksTable } from "../core/content-packs";
import { relations } from "drizzle-orm";

export const equipmentTable = pgTable("equipment", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  weight: integer("weight"),
  costValue: integer("cost_value"),
  costCurrencyId: uuid("cost_currency_id").references(() => currencyTable.id, {
    onDelete: "set null",
  }),
  isForSale: boolean("is_for_sale").notNull(),
  image: text("image"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
  description: text("description"),
});

export const equipmentRelations = relations(equipmentTable, ({ one }) => ({
  contentPack: one(contentPacksTable, {
    fields: [equipmentTable.contentPackId],
    references: [contentPacksTable.id],
  }),

  cost_currency: one(currencyTable, {
    fields: [equipmentTable.costCurrencyId],
    references: [currencyTable.id],
  }),
}));
