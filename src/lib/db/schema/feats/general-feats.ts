import { pgTable, uuid, text, primaryKey } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";
import { featuresTable } from "../rules/features";
import { abilityScoreEnum } from "../enums/ability-score";

export const generalFeatsTable = pgTable("general_feats", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  prerequisite: text("prerequisite"),
  description: text("description"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, {
      onDelete: "cascade",
    }),
});

export const generalFeatsRelations = relations(
  generalFeatsTable,
  ({ one, many }) => ({
    contentPack: one(contentPacksTable, {
      fields: [generalFeatsTable.contentPackId],
      references: [contentPacksTable.id],
    }),
    featureLinks: many(generalFeatsFeaturesTable),
    abilityScores: many(generalFeatsAbilityScoreTable),
  }),
);

export const generalFeatsFeaturesTable = pgTable(
  "general_feats_features",
  {
    generalFeatId: uuid("general_feats_id")
      .notNull()
      .references(() => generalFeatsTable.id, { onDelete: "cascade" }),

    featureId: uuid("feature_id")
      .notNull()
      .references(() => featuresTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.generalFeatId, table.featureId],
    }),
  ],
);

export const generalFeatsFeaturesRelations = relations(
  generalFeatsFeaturesTable,
  ({ one }) => ({
    generalFeat: one(generalFeatsTable, {
      fields: [generalFeatsFeaturesTable.generalFeatId],
      references: [generalFeatsTable.id],
    }),

    feature: one(featuresTable, {
      fields: [generalFeatsFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  }),
);

export const generalFeatsAbilityScoreTable = pgTable(
  "general_feats_ability_score",
  {
    generalFeatId: uuid("general_feats_id")
      .notNull()
      .references(() => generalFeatsTable.id, { onDelete: "cascade" }),

    abilityScore: abilityScoreEnum("ability_score").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.generalFeatId, table.abilityScore],
    }),
  ],
);

export const generalFeatsAbilityScoreRelations = relations(
  generalFeatsAbilityScoreTable,
  ({ one }) => ({
    generalFeat: one(generalFeatsTable, {
      fields: [generalFeatsAbilityScoreTable.generalFeatId],
      references: [generalFeatsTable.id],
    }),
  }),
);
