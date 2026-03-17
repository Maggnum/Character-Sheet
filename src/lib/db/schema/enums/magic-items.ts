import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const magicItemTypes = [
  "wondrous item",
  "armor",
  "ring",
  "potion",
  "weapon",
  "scroll",
  "staff",
  "wand",
] as const;

export const magicItemTypeDrizzleSchema = pgEnum(
  "magic_item_type",
  magicItemTypes,
);
export const magicItemTypeZodSchema = z.enum(magicItemTypes);

export type MagicItemType = (typeof magicItemTypes)[number];

export const magicItemLevels = [
  "common",
  "uncommon",
  "rare",
  "very rare",
  "legendary",
  "artifact",
] as const;

export const magicItemLevelDrizzleSchema = pgEnum(
  "magic_item_level",
  magicItemTypes,
);
export const magicItemLevelZodSchema = z.enum(magicItemLevels);

export type MagicItemLevel = (typeof magicItemLevels)[number];
