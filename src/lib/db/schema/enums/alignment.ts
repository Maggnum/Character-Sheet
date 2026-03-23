import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const alignments = [
  "lawful_good",
  "neutral_good",
  "chaotic_good",
  "lawful_neutral",
  "true_neutral",
  "chaotic_neutral",
  "lawful_evil",
  "neutral_evil",
  "chaotic_evil",
] as const;

export const alignmentEnum = pgEnum("alignment", alignments);
export const alignmentSchema = z.enum(alignments);

export type Alignment = (typeof alignments)[number];
