import { check, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { contentPacksTable } from "../core/content-packs";
import { relations, sql } from "drizzle-orm";

export const currencyTable = pgTable(
  "currency",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    conversionNumerator: integer("conversion_numerator").notNull(),
    conversionDenominator: integer("conversion_denominator").notNull(),
    contentPackId: uuid("content_pack_id")
      .notNull()
      .references(() => contentPacksTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    check("positive_denominator", sql`${table.conversionDenominator} > 0`),
  ],
);

export const currencyRelations = relations(currencyTable, ({ one }) => ({
  contentPack: one(contentPacksTable, {
    fields: [currencyTable.contentPackId],
    references: [contentPacksTable.id],
  }),
}));
