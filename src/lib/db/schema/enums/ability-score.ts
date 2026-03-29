import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const abilityScores = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export const abilityScoreEnum = pgEnum("ability_score", abilityScores);
export const abilityScoreSchema = z.enum(abilityScores);

export type AbilityScore = (typeof abilityScores)[number];
