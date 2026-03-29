import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

/**
 * @todo: convert to table
 */
export const creatureTypes = ["humanoid"] as const;

export const creatureTypeEnum = pgEnum("creature_type", creatureTypes);
export const creatureTypeSchema = z.enum(creatureTypes);

export type CreatureType = (typeof creatureTypes)[number];

export const creatureSizes = ["small", "medium", "large"] as const;

export const creatureSizeEnum = pgEnum("creature_size", creatureSizes);
export const creatureSizeSchema = z.enum(creatureSizes);

export type CreatureSize = (typeof creatureSizes)[number];
