import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { charactersTable } from "./characters";
import { weaponCategoryEnum } from "../enums/weapon";
import { languagesTable } from "../rules/languages";
import { relations } from "drizzle-orm";
import { armorTypeEnum } from "../enums/armor";
import { toolsTable } from "../equipment/tools";

export const characterWeaponProficienciesTable = pgTable(
  "characters_weapon_proficiencies",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    weaponCategory: weaponCategoryEnum("weapon_category").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.weaponCategory],
    }),
  ],
);

export const characterArmorTrainingTable = pgTable(
  "characters_armor_training",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    armorType: armorTypeEnum("armor_type").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.armorType],
    }),
  ],
);

export const characterToolProficienciesTable = pgTable(
  "characters_tool_proficiencies",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    toolId: uuid("tool_id").references(() => toolsTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.toolId],
    }),
  ],
);

export const characterToolProficienciesRelations = relations(
  characterToolProficienciesTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterToolProficienciesTable.characterId],
      references: [charactersTable.id],
    }),
    tool: one(toolsTable, {
      fields: [characterToolProficienciesTable.toolId],
      references: [toolsTable.id],
    }),
  }),
);

export const characterLanguagesTable = pgTable(
  "characters_languages",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    languageId: uuid("language_id").references(() => languagesTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.languageId],
    }),
  ],
);

export const characterLanguagesRelations = relations(
  characterLanguagesTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterLanguagesTable.characterId],
      references: [charactersTable.id],
    }),
    language: one(languagesTable, {
      fields: [characterLanguagesTable.languageId],
      references: [languagesTable.id],
    }),
  }),
);
