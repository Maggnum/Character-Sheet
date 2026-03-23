import { pgTable, uuid, text, primaryKey } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";
import { featuresTable } from "../rules/features";

export const fightingStyleFeatsTable = pgTable("fighting_style_feats", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
});

export const fightingStyleFeatsRelations = relations(
  fightingStyleFeatsTable,
  ({ one, many }) => ({
    contentPack: one(contentPacksTable, {
      fields: [fightingStyleFeatsTable.contentPackId],
      references: [contentPacksTable.id],
    }),

    features: many(fightingStyleFeatsFeaturesTable),
  }),
);

export const fightingStyleFeatsFeaturesTable = pgTable(
  "fighting_style_feats_features",
  {
    fightingStyleFeatId: uuid("fighting_style_feat_id")
      .notNull()
      .references(() => fightingStyleFeatsTable.id, { onDelete: "cascade" }),

    featureId: uuid("feature_id")
      .notNull()
      .references(() => featuresTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.fightingStyleFeatId, table.featureId],
    }),
  ],
);

export const fightingStyleFeatsFeaturesRelations = relations(
  fightingStyleFeatsFeaturesTable,
  ({ one }) => ({
    fightingStyleFeat: one(fightingStyleFeatsTable, {
      fields: [fightingStyleFeatsFeaturesTable.fightingStyleFeatId],
      references: [fightingStyleFeatsTable.id],
    }),

    feature: one(featuresTable, {
      fields: [fightingStyleFeatsFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  }),
);
