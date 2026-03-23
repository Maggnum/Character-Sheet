import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const damageTypes = [
  "acid",
  "bludgeoning",
  "cold",
  "fire",
  "force",
  "lightning",
  "necrotic",
  "piercing",
  "poison",
  "psychic",
  "radiant",
  "slashing",
  "thunder",
] as const;

export const damageTypeEnum = pgEnum("damage_type", damageTypes);
export const damageTypeSchema = z.enum(damageTypes);

export type DamageType = (typeof damageTypes)[number];
