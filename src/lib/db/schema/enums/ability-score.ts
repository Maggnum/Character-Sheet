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

export const abilityScoreDrizzleSchema = pgEnum("ability-score", abilityScores);
export const abilityScoreZodSchema = z.enum(abilityScores);

export type AbilityScore = (typeof abilityScores)[number];
