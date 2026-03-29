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

export const magicItemTypeEnum = pgEnum("magic_item_type", magicItemTypes);
export const magicItemTypeSchema = z.enum(magicItemTypes);

export type MagicItemType = (typeof magicItemTypes)[number];

export const magicItemLevels = [
  "common",
  "uncommon",
  "rare",
  "very rare",
  "legendary",
  "artifact",
] as const;

export const magicItemLevelEnum = pgEnum("magic_item_level", magicItemTypes);
export const magicItemLevelSchema = z.enum(magicItemLevels);

export type MagicItemLevel = (typeof magicItemLevels)[number];
