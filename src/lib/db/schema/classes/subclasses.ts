import {
  pgTable,
  uuid,
  text,
  smallint,
  primaryKey,
  check,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

import { classesTable } from "./classes";
import { contentPacksTable } from "../core/content-packs";
import { featuresTable } from "../rules/features";
import { resourcesTable } from "../rules/resources";

export const subclassesTable = pgTable("subclasses", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom()
    .references(() => classesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
  description: text("description"),
});

export const subclassesRelations = relations(
  subclassesTable,
  ({ one, many }) => ({
    class: one(classesTable, {
      fields: [subclassesTable.id],
      references: [classesTable.id],
    }),

    contentPack: one(contentPacksTable, {
      fields: [subclassesTable.contentPackId],
      references: [contentPacksTable.id],
    }),

    features: many(subclassesFeaturesTable),
    resources: many(subclassesResourcesTable),
  }),
);

export const subclassesFeaturesTable = pgTable(
  "subclasses_features",
  {
    subclassId: uuid("subclass_id")
      .notNull()
      .references(() => subclassesTable.id, { onDelete: "cascade" }),
    featureId: uuid("feature_id")
      .notNull()
      .references(() => featuresTable.id, { onDelete: "cascade" }),
    level: smallint("level").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.subclassId, table.featureId],
    }),
    check(
      "valid_subclasses_features_level",
      sql`${table.level} >= 1 AND ${table.level} <= 20`,
    ),
  ],
);

export const subclassesFeaturesRelations = relations(
  subclassesFeaturesTable,
  ({ one }) => ({
    subclass: one(subclassesTable, {
      fields: [subclassesFeaturesTable.subclassId],
      references: [subclassesTable.id],
    }),

    feature: one(featuresTable, {
      fields: [subclassesFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  }),
);

export const subclassesResourcesTable = pgTable(
  "subclasses_resources",
  {
    subclassId: uuid("subclass_id").references(() => subclassesTable.id, {
      onDelete: "cascade",
    }),
    resourceId: uuid("resource_id").references(() => resourcesTable.id, {
      onDelete: "cascade",
    }),
    level: smallint("level"),
    amount: smallint("amount"),
  },
  (table) => [
    primaryKey({
      columns: [table.subclassId, table.resourceId, table.level],
    }),
    check(
      "valid_subclasses_resource_level",
      sql`${table.level} >= 1 AND ${table.level} <= 20`,
    ),
  ],
);

export const subclassesResourcesRelations = relations(
  subclassesResourcesTable,
  ({ one }) => ({
    subclass: one(subclassesTable, {
      fields: [subclassesResourcesTable.subclassId],
      references: [subclassesTable.id],
    }),

    feature: one(resourcesTable, {
      fields: [subclassesResourcesTable.resourceId],
      references: [resourcesTable.id],
    }),
  }),
);
