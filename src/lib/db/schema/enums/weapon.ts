import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";
export const weaponCategories = ["simple", "martial"] as const;

export const weaponCategoryDrizzleSchema = pgEnum(
  "weapon_category",
  weaponCategories,
);
export const weaponCategoryZodSchema = z.enum(weaponCategories);

export type WeaponCategory = (typeof weaponCategories)[number];

export const weaponTypes = ["melee", "ranged"] as const;

export const weaponTypesDrizzleSchema = pgEnum("weapon_type", weaponTypes);
export const weaponTypesZodSchema = z.enum(weaponTypes);

export type WeaponTypes = (typeof weaponTypes)[number];
