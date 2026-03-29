import { pgTable, uuid, text, smallint, integer } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { backgroundsTable } from "../backgrounds/backgrounds";
import { usersTable } from "../core/users";
import { speciesTable } from "../species/species";
import { alignmentEnum } from "../enums/alignment";
import { originFeatsTable } from "../feats/origin-feats";
import { characterClassesTable } from "./character-classes";
import {
  characterSpellsTable,
  characterSpellSlotsTable,
} from "./character-spells";
import { characterResourcesTable } from "./character-resources";
import {
  charactersFightingStyleFeatsTable,
  charactersGeneralFeatsTable,
} from "./character-feats";
import {
  charactersCurrencyTable,
  charactersEquipmentTable,
} from "./character-equipment";
import { characterSkillsTable } from "./character-skills";
import {
  characterArmorTrainingTable,
  characterToolProficienciesTable,
  characterWeaponProficienciesTable,
  characterLanguagesTable,
} from "./character-proficiencies";
import {
  characterActionsTable,
  characterHitDiceTable,
  characterSavingThrowsTable,
} from "./character-combat";
import { characterDescriptionsTable } from "./character-description";
import { characterFeaturesTable } from "./character-features";

export const charactersTable = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),

  // ===== Basic information =====
  name: text("name").notNull(),
  backgroundId: uuid("background_id").references(() => backgroundsTable.id, {
    onDelete: "set null",
  }),
  playerId: uuid("player_id").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  speciesId: uuid("species_id").references(() => speciesTable.id, {
    onDelete: "set null",
  }),
  alignment: alignmentEnum("alignment"),
  experiencePoints: integer("experience_points"),

  // ===== Misc =====
  originFeatId: uuid("origin_feat_id").references(() => originFeatsTable.id, {
    onDelete: "set null",
  }),
  inspiration: smallint("inspiration"),
  proficiencyBonus: smallint("proficiency_bonus").notNull(),

  // ===== Combat =====
  speed: smallint("speed").notNull(),
  armorClass: smallint("armor_class").notNull(),
  initiative: smallint("initiative").notNull(),
  maxHitPoints: smallint("max_hit_points").notNull(),
  currentHitPoints: smallint("current_hit_points").notNull(),

  temporaryHitPoints: smallint("temporary_hit_points").notNull(),
  successesDeathSaves: smallint("successes_death_saves"),
  failuresDeathSaves: smallint("failures_death_saves"),

  // ===== Ability Scores =====
  strength: smallint("strength").notNull(),
  dexterity: smallint("dexterity").notNull(),
  constitution: smallint("constitution").notNull(),
  intelligence: smallint("intelligence").notNull(),
  wisdom: smallint("wisdom").notNull(),
  charisma: smallint("charisma").notNull(),

  // ===== Description =====
  age: smallint("age"),
  height: smallint("height"),
  weight: smallint("weight"),
  eyes: text("eyes"),
  skin: text("skin"),
  hair: text("hair"),

  image: text("image"),

  // ===== Other =====
  otherProficiencies: text("other_proficiencies"),
  otherFeatures: text("other_features"),
  otherActions: text("other_actions"),
  otherEquipment: text("other_equipment"),
});

export const charactersRelations = relations(
  charactersTable,
  ({ one, many }) => ({
    player: one(usersTable, {
      fields: [charactersTable.playerId],
      references: [usersTable.id],
    }),

    background: one(backgroundsTable, {
      fields: [charactersTable.backgroundId],
      references: [backgroundsTable.id],
    }),

    species: one(speciesTable, {
      fields: [charactersTable.speciesId],
      references: [speciesTable.id],
    }),

    originFeat: one(originFeatsTable, {
      fields: [charactersTable.originFeatId],
      references: [originFeatsTable.id],
    }),

    classes: many(characterClassesTable),
    descriptions: many(characterDescriptionsTable),

    // ===== Spells and Resources =====
    spells: many(characterSpellsTable),
    spellSlots: many(characterSpellSlotsTable),
    resources: many(characterResourcesTable),
    features: many(characterFeaturesTable),

    // ===== Feats =====
    generalFeats: many(charactersGeneralFeatsTable),
    fightingStyleFeats: many(charactersFightingStyleFeatsTable),

    // ===== Equipment =====
    equipment: many(charactersEquipmentTable),
    currency: many(charactersCurrencyTable),

    // ===== Knowledge =====
    skills: many(characterSkillsTable),
    languages: many(characterLanguagesTable),
    weaponsProficiencies: many(characterWeaponProficienciesTable),
    armorTraining: many(characterArmorTrainingTable),
    toolsProficiencies: many(characterToolProficienciesTable),

    // ===== Combat =====
    savingThrows: many(characterSavingThrowsTable),
    hitDice: many(characterHitDiceTable),
    actions: many(characterActionsTable),
  }),
);
