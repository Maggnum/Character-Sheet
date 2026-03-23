import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { abilityScoreEnum } from "../enums/ability-score";

export const skillsTable = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  abilityScore: abilityScoreEnum("ability_score").notNull(),
  description: text("description"),
});
