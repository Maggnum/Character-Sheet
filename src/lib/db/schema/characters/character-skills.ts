import {
  pgTable,
  uuid,
  boolean,
  smallint,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { charactersTable } from "./characters";
import { skillsTable } from "../rules/skills";

export const characterSkillsTable = pgTable(
  "characters_skills",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    skillId: uuid("skill_id").references(() => skillsTable.id, {
      onDelete: "cascade",
    }),
    proficiency: boolean("proficiency").notNull().default(false),
    expertise: boolean("expertise").notNull().default(false),
    score: smallint("score"),
    note: text("note"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.skillId],
    }),
  ],
);

export const characterSkillsRelations = relations(
  characterSkillsTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterSkillsTable.characterId],
      references: [charactersTable.id],
    }),

    skill: one(skillsTable, {
      fields: [characterSkillsTable.skillId],
      references: [skillsTable.id],
    }),
  }),
);
