import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const toolTypes = [
  "artisan_tool",
  "gaming_set",
  "musical_instrument",
  "other",
] as const;

export const toolTypeEnum = pgEnum("tool_type", toolTypes);
export const toolTypeSchema = z.enum(toolTypes);

export type ToolType = (typeof toolTypes)[number];
