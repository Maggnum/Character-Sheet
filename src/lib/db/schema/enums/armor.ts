import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const armorTypes = ["light", "medium", "heavy", "shield"] as const;

export const armorTypeDrizzleSchema = pgEnum("armor_type", armorTypes);
export const armorTypeZodSchema = z.enum(armorTypes);

export type ArmorType = (typeof armorTypes)[number];
