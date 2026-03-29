import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";

export const trinketsTable = pgTable("trinkets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
});

export const trinketsRelations = relations(trinketsTable, ({ one }) => ({
  contentPack: one(contentPacksTable, {
    fields: [trinketsTable.contentPackId],
    references: [contentPacksTable.id],
  }),
}));
