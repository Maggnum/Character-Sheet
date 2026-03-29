import {
  pgTable,
  uuid,
  smallint,
  boolean,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

import { charactersTable } from "./characters";
import { abilityScoreEnum } from "../enums/ability-score";

export const characterSavingThrowsTable = pgTable(
  "characters_saving_throws",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    abilityScore: abilityScoreEnum("ability_score"),
    proficiency: boolean("proficiency").notNull().default(false),
    score: smallint("score"),
    note: text("note"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.abilityScore],
    }),
  ],
);

export const characterHitDiceTable = pgTable(
  "characters_hit_dice",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    hitDieType: smallint("hit_die_type"),
    total: smallint("hit_die_amount_total"),
    current: smallint("hit_die_amount_current"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.hitDieType],
    }),
  ],
);

export const characterActionsTable = pgTable(
  "characters_actions",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    name: text("name"),
    attackBonus: smallint("attack_bonus"),
    damage: text("damage"),
    interval: text("interval"),
    note: text("note"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.name],
    }),
  ],
);
