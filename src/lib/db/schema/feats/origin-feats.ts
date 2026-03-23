import { pgTable, uuid, text, primaryKey } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";
import { featuresTable } from "../rules/features";

export const originFeatsTable = pgTable("origin_feats", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, {
      onDelete: "cascade",
    }),
});

export const originFeatsRelations = relations(
  originFeatsTable,
  ({ one, many }) => ({
    contentPack: one(contentPacksTable, {
      fields: [originFeatsTable.contentPackId],
      references: [contentPacksTable.id],
    }),

    features: many(originFeatsFeaturesTable),
  }),
);

export const originFeatsFeaturesTable = pgTable(
  "origin_feats_features",
  {
    originFeatId: uuid("origin_feat_id")
      .notNull()
      .references(() => originFeatsTable.id, { onDelete: "cascade" }),
    featureId: uuid("feature_id")
      .notNull()
      .references(() => featuresTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.originFeatId, table.featureId],
    }),
  ],
);

export const originFeatsFeaturesRelations = relations(
  originFeatsFeaturesTable,
  ({ one }) => ({
    originFeat: one(originFeatsTable, {
      fields: [originFeatsFeaturesTable.originFeatId],
      references: [originFeatsTable.id],
    }),

    feature: one(featuresTable, {
      fields: [originFeatsFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  }),
);
