import { pgTable, uuid, text, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { originFeatsTable } from "../feats";
import { toolsTable } from "../equipment";
import { contentPacksTable } from "../core";
import { abilityScoreEnum } from "../enums";
import { skillsTable } from "../rules";
import { equipmentKitsTable } from "../equipment";

export const backgroundsTable = pgTable("backgrounds", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  featId: uuid("feat_id").references(() => originFeatsTable.id, {
    onDelete: "set null",
  }),
  toolId: uuid("tool_id").references(() => toolsTable.id, {
    onDelete: "set null",
  }),
  equipmentKitId: uuid("equipment_kit_id").references(
    () => equipmentKitsTable.id,
    {
      onDelete: "set null",
    },
  ),
  description: text("description"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
});

export const backgroundsRelations = relations(
  backgroundsTable,
  ({ one, many }) => ({
    contentPack: one(contentPacksTable, {
      fields: [backgroundsTable.contentPackId],
      references: [contentPacksTable.id],
    }),

    feat: one(originFeatsTable, {
      fields: [backgroundsTable.featId],
      references: [originFeatsTable.id],
    }),

    tool: one(toolsTable, {
      fields: [backgroundsTable.toolId],
      references: [toolsTable.id],
    }),

    equipmentKit: one(equipmentKitsTable, {
      fields: [backgroundsTable.equipmentKitId],
      references: [equipmentKitsTable.id],
    }),

    abilityScores: many(backgroundAbilityScoreTable),
    skills: many(backgroundSkillsTable),
  }),
);

export const backgroundAbilityScoreTable = pgTable(
  "background_ability_score",
  {
    backgroundId: uuid("background_id")
      .notNull()
      .references(() => backgroundsTable.id, { onDelete: "cascade" }),

    abilityScore: abilityScoreEnum("ability_score").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.backgroundId, table.abilityScore],
    }),
  ],
);

export const backgroundAbilityScoreRelations = relations(
  backgroundAbilityScoreTable,
  ({ one }) => ({
    background: one(backgroundsTable, {
      fields: [backgroundAbilityScoreTable.backgroundId],
      references: [backgroundsTable.id],
    }),
  }),
);

export const backgroundSkillsTable = pgTable(
  "background_skills",
  {
    backgroundId: uuid("background_id")
      .notNull()
      .references(() => backgroundsTable.id, { onDelete: "cascade" }),

    skillId: uuid("skill_id")
      .notNull()
      .references(() => skillsTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.backgroundId, table.skillId],
    }),
  ],
);

export const backgroundSkillsRelations = relations(
  backgroundSkillsTable,
  ({ one }) => ({
    background: one(backgroundsTable, {
      fields: [backgroundSkillsTable.backgroundId],
      references: [backgroundsTable.id],
    }),

    skill: one(skillsTable, {
      fields: [backgroundSkillsTable.skillId],
      references: [skillsTable.id],
    }),
  }),
);
