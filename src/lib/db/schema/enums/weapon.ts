import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";
export const weaponCategories = ["simple", "martial"] as const;

export const weaponCategoryEnum = pgEnum("weapon_category", weaponCategories);
export const weaponCategorySchema = z.enum(weaponCategories);

export type WeaponCategory = (typeof weaponCategories)[number];

export const weaponTypes = ["melee", "ranged"] as const;

export const weaponTypesEnum = pgEnum("weapon_type", weaponTypes);
export const weaponTypesSchema = z.enum(weaponTypes);

export type WeaponTypes = (typeof weaponTypes)[number];
