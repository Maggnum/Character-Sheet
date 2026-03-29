import { pgTable, uuid, primaryKey, smallint } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { featuresTable } from "../rules/features";
import { charactersTable } from "./characters";

export const characterFeaturesTable = pgTable(
  "classes_features",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    featureId: uuid("feature_id").references(() => featuresTable.id, {
      onDelete: "cascade",
    }),
    total: smallint("total"),
    used: smallint("used"),
  },
  (table) => [
    primaryKey({
      columns: [table.characterId, table.featureId],
    }),
  ],
);

export const characterFeaturesRelations = relations(
  characterFeaturesTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [characterFeaturesTable.characterId],
      references: [charactersTable.id],
    }),
    feature: one(featuresTable, {
      fields: [characterFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  }),
);
