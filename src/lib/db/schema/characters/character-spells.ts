import {
  pgTable,
  uuid,
  text,
  boolean,
  smallint,
  primaryKey,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { charactersTable } from "./characters";
import { spellsTable } from "../spells/spells";
import { classesTable } from "../classes/classes";

export const characterSpellsTable = pgTable(
  "characters_spells",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    spellId: uuid("spell_id").references(() => spellsTable.id, {
      onDelete: "cascade",
    }),
    classOwnerId: uuid("class_owner_id").references(() => classesTable.id, {
      onDelete: "set null",
    }),
    isPrepared: boolean("is_prepared").notNull(),
    note: text("note"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.spellId],
    }),
  ],
);

export const characterSpellsRelations = relations(
  characterSpellsTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterSpellsTable.characterId],
      references: [charactersTable.id],
    }),

    spell: one(spellsTable, {
      fields: [characterSpellsTable.spellId],
      references: [spellsTable.id],
    }),

    classOwner: one(classesTable, {
      fields: [characterSpellsTable.classOwnerId],
      references: [classesTable.id],
    }),
  }),
);

export const characterSpellSlotsTable = pgTable(
  "characters_spell_slots",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    level: smallint("level").notNull(),
    total: smallint("total").notNull(),
    used: smallint("used").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.level],
    }),
  ],
);

export const characterSpellSlotsRelations = relations(
  characterSpellSlotsTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterSpellSlotsTable.characterId],
      references: [charactersTable.id],
    }),
  }),
);
