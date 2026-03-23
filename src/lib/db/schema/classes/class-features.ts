import {
  pgTable,
  uuid,
  smallint,
  primaryKey,
  check,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { classesTable } from "./classes";
import { featuresTable } from "../rules/features";

export const classesFeaturesTable = pgTable(
  "classes_features",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    featureId: uuid("feature_id").references(() => featuresTable.id, {
      onDelete: "cascade",
    }),
    level: smallint("level").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.featureId],
    }),
    check(
      "valid_class_features_level",
      sql`${table.level} >= 1 AND ${table.level} <= 20`,
    ),
  ],
);

export const classesFeaturesRelations = relations(
  classesFeaturesTable,
  ({ one }) => ({
    class: one(classesTable, {
      fields: [classesFeaturesTable.classId],
      references: [classesTable.id],
    }),
    feature: one(featuresTable, {
      fields: [classesFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  }),
);
