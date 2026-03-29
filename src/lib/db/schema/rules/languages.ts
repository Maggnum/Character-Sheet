import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";

export const languagesTable = pgTable("languages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
});

export const languagesRelations = relations(languagesTable, ({ one }) => ({
  contentPack: one(contentPacksTable, {
    fields: [languagesTable.contentPackId],
    references: [contentPacksTable.id],
  }),
}));
