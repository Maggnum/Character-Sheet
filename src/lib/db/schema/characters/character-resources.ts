import { pgTable, primaryKey, smallint, uuid } from "drizzle-orm/pg-core";
import { charactersTable } from "./characters";
import { resourcesTable } from "../rules/resources";
import { relations } from "drizzle-orm";

export const characterResourcesTable = pgTable(
  "characters_resources",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    resourceId: uuid("resource_id").references(() => resourcesTable.id, {
      onDelete: "cascade",
    }),
    total: smallint("total"),
    used: smallint("used"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.resourceId],
    }),
  ],
);

export const characterResourcesRelations = relations(
  characterResourcesTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterResourcesTable.characterId],
      references: [charactersTable.id],
    }),

    resource: one(resourcesTable, {
      fields: [characterResourcesTable.resourceId],
      references: [resourcesTable.id],
    }),
  }),
);
