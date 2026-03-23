import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { charactersTable } from "./characters";
import { generalFeatsTable } from "../feats/general-feats";
import { relations } from "drizzle-orm";
import { fightingStyleFeatsTable } from "../feats/fighting-style-feats";

export const charactersGeneralFeatsTable = pgTable(
  "characters_general_feats",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    featId: uuid("feat_id").references(() => generalFeatsTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [primaryKey({ columns: [table.characterId, table.featId] })],
);

export const charactersGeneralFeatsRelations = relations(
  charactersGeneralFeatsTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [charactersGeneralFeatsTable.characterId],
      references: [charactersTable.id],
    }),

    feat: one(generalFeatsTable, {
      fields: [charactersGeneralFeatsTable.featId],
      references: [generalFeatsTable.id],
    }),
  }),
);

export const charactersFightingStyleFeatsTable = pgTable(
  "characters_fighting_style_feats",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    featId: uuid("feat_id").references(() => fightingStyleFeatsTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [primaryKey({ columns: [table.characterId, table.featId] })],
);

export const charactersFightingStyleFeatsRelations = relations(
  charactersFightingStyleFeatsTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [charactersFightingStyleFeatsTable.characterId],
      references: [charactersTable.id],
    }),

    feat: one(fightingStyleFeatsTable, {
      fields: [charactersFightingStyleFeatsTable.featId],
      references: [fightingStyleFeatsTable.id],
    }),
  }),
);
