import { pgTable, uuid, text, primaryKey } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { creatureSizeEnum, creatureTypeEnum } from "../enums/creature";
import { contentPacksTable } from "../core/content-packs";
import { featuresTable } from "../rules/features";

export const speciesTable = pgTable("species", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  creatureType: creatureTypeEnum("creature_type").notNull(),
  size: creatureSizeEnum("size").notNull(),
  speed: text("speed").notNull(),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
});

export const speciesRelations = relations(speciesTable, ({ one, many }) => ({
  contentPack: one(contentPacksTable, {
    fields: [speciesTable.contentPackId],
    references: [contentPacksTable.id],
  }),

  features: many(speciesFeaturesTable),
}));

export const speciesFeaturesTable = pgTable(
  "species_features",
  {
    specieId: uuid("specie_id")
      .notNull()
      .references(() => speciesTable.id, { onDelete: "cascade" }),

    featureId: uuid("feature_id")
      .notNull()
      .references(() => featuresTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.specieId, table.featureId],
    }),
  ],
);

export const speciesFeaturesRelations = relations(
  speciesFeaturesTable,
  ({ one }) => ({
    species: one(speciesTable, {
      fields: [speciesFeaturesTable.specieId],
      references: [speciesTable.id],
    }),

    feature: one(featuresTable, {
      fields: [speciesFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  }),
);
