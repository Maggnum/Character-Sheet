import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const armorTypes = ["light", "medium", "heavy", "shield"] as const;

export const armorTypeEnum = pgEnum("armor_type", armorTypes);
export const armorTypeSchema = z.enum(armorTypes);

export type ArmorType = (typeof armorTypes)[number];
