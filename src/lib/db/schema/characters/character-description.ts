import { pgTable, uuid, text, primaryKey } from "drizzle-orm/pg-core";
import { charactersTable } from "./characters";

export const characterDescriptionsTable = pgTable(
  "characters_descriptions",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    title: text("title"),
    description: text("description"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.title],
    }),
  ],
);
