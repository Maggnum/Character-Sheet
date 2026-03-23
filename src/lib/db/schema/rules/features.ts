import { pgTable, uuid, text } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";
import { originFeatsFeaturesTable } from "../feats/origin-feats";
import { generalFeatsFeaturesTable } from "../feats/general-feats";
import { fightingStyleFeatsTable } from "../feats/fighting-style-feats";
import { speciesFeaturesTable } from "../species/species";
import { subclassesFeaturesTable } from "../classes/subclasses";
import { rechargePeriodEnum } from "../enums/recharge-period";
import { classesFeaturesTable } from "../classes/class-features";

export const featuresTable = pgTable("features", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  rechargeOn: rechargePeriodEnum("recharge_on"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
  description: text("description"),
});

export const featuresRelations = relations(featuresTable, ({ one, many }) => ({
  contentPack: one(contentPacksTable, {
    fields: [featuresTable.contentPackId],
    references: [contentPacksTable.id],
  }),

  classes: many(classesFeaturesTable),
  subclasses: many(subclassesFeaturesTable),
  species: many(speciesFeaturesTable),

  generalFeats: many(generalFeatsFeaturesTable),
  originFeats: many(originFeatsFeaturesTable),
  fightingStyleFeats: many(fightingStyleFeatsTable),
}));
