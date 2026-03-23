import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const magicSchools = [
  "conjuration",
  "necromancy",
  "evocation",
  "abjuration",
  "transmutation",
  "divination",
  "enchantment",
  "illusion",
] as const;

export const magicSchoolEnum = pgEnum("magic_school", magicSchools);
export const magicSchoolSchema = z.enum(magicSchools);

export type MagicSchool = (typeof magicSchools)[number];
