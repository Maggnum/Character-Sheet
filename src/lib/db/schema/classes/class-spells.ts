import {
  pgTable,
  uuid,
  smallint,
  primaryKey,
  check,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

import { classesTable } from "./classes";
import { spellsTable } from "../spells/spells";

export const classesSpellsTable = pgTable(
  "classes_spells",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    spellId: uuid("spell_id").references(() => spellsTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.spellId],
    }),
  ],
);

export const classesSpellsRelations = relations(
  classesSpellsTable,
  ({ one }) => ({
    class: one(classesTable, {
      fields: [classesSpellsTable.classId],
      references: [classesTable.id],
    }),
    spell: one(spellsTable, {
      fields: [classesSpellsTable.spellId],
      references: [spellsTable.id],
    }),
  }),
);

export const classSpellsLevelTable = pgTable(
  "class_spells_level",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    level: smallint("level"),
    cantrips: smallint("cantrips"),
    preparedSpells: smallint("prepared_spells"),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.level],
    }),
    check(
      "valid_class_spells_level",
      sql`${table.level} >= 1 AND ${table.level} <= 20`,
    ),
  ],
);

export const classSpellsLevelRelations = relations(
  classSpellsLevelTable,
  ({ one }) => ({
    class: one(classesTable, {
      fields: [classSpellsLevelTable.classId],
      references: [classesTable.id],
    }),
  }),
);
