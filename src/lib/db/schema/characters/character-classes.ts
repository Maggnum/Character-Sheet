import {
  pgTable,
  uuid,
  smallint,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { charactersTable } from "./characters";
import { classesTable } from "../classes/classes";
import { subclassesTable } from "../classes/subclasses";
import { abilityScoreEnum } from "../enums/ability-score";

export const characterClassesTable = pgTable(
  "characters_classes",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    subclassId: uuid("subclass_id").references(() => subclassesTable.id, {
      onDelete: "set null",
    }),

    level: smallint("level").notNull(),
    isMulticlass: boolean("is_multiclass").notNull(),

    spellcastingAbility: abilityScoreEnum("spellcasting_abilty"),
    spellSaveDc: smallint("spell_save_dc"),
    spellAttackBonus: smallint("spell_attack_bonus"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.classId],
    }),
  ],
);

export const characterClassesRelations = relations(
  characterClassesTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterClassesTable.characterId],
      references: [charactersTable.id],
    }),

    class: one(classesTable, {
      fields: [characterClassesTable.classId],
      references: [classesTable.id],
    }),

    subclass: one(subclassesTable, {
      fields: [characterClassesTable.subclassId],
      references: [subclassesTable.id],
    }),
  }),
);
