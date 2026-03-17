import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

/**
 * @todo: convert to table
 */
export const creatureTypes = ["humanoid"] as const;

export const creatureTypeDrizzleSchema = pgEnum("creature_type", creatureTypes);
export const creatureTypeZodSchema = z.enum(creatureTypes);

export type CreatureType = (typeof creatureTypes)[number];

export const creatureSizes = ["small", "medium", "large"] as const;

export const creatureSizeDrizzleSchema = pgEnum("creature_size", creatureSizes);
export const creatureSizeZodSchema = z.enum(creatureSizes);

export type CreatureSize = (typeof creatureSizes)[number];
