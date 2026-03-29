import { pgTable, uuid, primaryKey, boolean } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { classesTable } from "./classes";
import { abilityScoreEnum } from "../enums/ability-score";
import { skillsTable } from "../rules/skills";
import { weaponCategoryEnum } from "../enums/weapon";
import { armorTypeEnum } from "../enums/armor";
import { toolsTable } from "../equipment/tools";

export const classSavingThrowProficienciesTable = pgTable(
  "class_saving_throw_proficiencies",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    abilityScore: abilityScoreEnum("ability_score"),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.abilityScore],
    }),
  ],
);

export const classSkillProficienciesTable = pgTable(
  "class_skill_proficiencies",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    skillId: uuid("skill_id").references(() => skillsTable.id, {
      onDelete: "cascade",
    }),
    acquiredWhenMulticlass: boolean("acquired_when_multiclass").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.skillId],
    }),
  ],
);

export const classSkillProficienciesRelations = relations(
  classSkillProficienciesTable,
  ({ one }) => ({
    class: one(classesTable, {
      fields: [classSkillProficienciesTable.classId],
      references: [classesTable.id],
    }),
    skill: one(skillsTable, {
      fields: [classSkillProficienciesTable.skillId],
      references: [skillsTable.id],
    }),
  }),
);

export const classWeaponProficienciesTable = pgTable(
  "class_weapon_proficiencies",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    weaponCategory: weaponCategoryEnum("weapon_category"),
    acquiredWhenMulticlass: boolean("acquired_when_multiclass").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.weaponCategory],
    }),
  ],
);

export const classArmorTrainingTable = pgTable(
  "class_armor_training",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    armorType: armorTypeEnum("armor_type"),
    acquiredWhenMulticlass: boolean("acquired_when_multiclass").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.armorType],
    }),
  ],
);

export const classToolProficiencies = pgTable(
  "class_tool_proficiencies",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    toolId: uuid("tool_id").references(() => toolsTable.id, {
      onDelete: "cascade",
    }),
    acquiredWhenMulticlass: boolean("acquired_when_multiclass").notNull(),
    isOptinal: boolean("is_optinal").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.toolId],
    }),
  ],
);

export const classToolProficienciesRelations = relations(
  classToolProficiencies,
  ({ one }) => ({
    class: one(classesTable, {
      fields: [classToolProficiencies.classId],
      references: [classesTable.id],
    }),
    tool: one(toolsTable, {
      fields: [classToolProficiencies.toolId],
      references: [toolsTable.id],
    }),
  }),
);
