import { pgTable, uuid, text, smallint } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { contentPacksTable } from "../core/content-packs";
import { abilityScoreEnum } from "../enums/ability-score";
import { subclassesTable } from "./subclasses";
import {
  classArmorTrainingTable,
  classSavingThrowProficienciesTable,
  classSkillProficienciesTable,
  classToolProficiencies,
  classWeaponProficienciesTable,
} from "./class-proficiencies";
import { classesSpellsTable, classSpellsLevelTable } from "./class-spells";
import { classesResourcesTable } from "./class-resources";
import { classesFeaturesTable } from "./class-features";
import { equipmentKitsTable } from "../equipment/equipment-kits";
import { multiclassTable } from "./multiclass";

export const classesTable = pgTable("classes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  primaryAbility: abilityScoreEnum("primary_ability"),
  hitPointDice: smallint("hit_point_dice").notNull(),
  skillProficienciesAmount: smallint("skill_proficiencies_amount").notNull(),
  toolProficienciesAmount: smallint("tool_proficiencies_amount").notNull(),
  startingGold: smallint("starting_gold").notNull(),
  spellSlotMultiplier: smallint("spell_slot_multiplier").notNull(),
  equipmentKitId: uuid("equipment_kit_id")
    .notNull()
    .references(() => equipmentKitsTable.id),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
  description: text("description"),
});

export const classesRelations = relations(classesTable, ({ one, many }) => ({
  contentPack: one(contentPacksTable, {
    fields: [classesTable.contentPackId],
    references: [contentPacksTable.id],
  }),
  equipmentKit: one(equipmentKitsTable, {
    fields: [classesTable.equipmentKitId],
    references: [equipmentKitsTable.id],
  }),
  multiclass: one(multiclassTable),

  subclasses: many(subclassesTable),

  spells: many(classesSpellsTable),
  spellProgression: many(classSpellsLevelTable),
  resources: many(classesResourcesTable),
  features: many(classesFeaturesTable),

  savingThrowsProficiencies: many(classSavingThrowProficienciesTable),
  skillsProficiencies: many(classSkillProficienciesTable),
  weaponsProficiencies: many(classWeaponProficienciesTable),
  armorTraining: many(classArmorTrainingTable),
  toolsProficiencies: many(classToolProficiencies),
}));
