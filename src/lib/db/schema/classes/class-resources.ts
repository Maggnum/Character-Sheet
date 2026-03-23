import {
  pgTable,
  uuid,
  smallint,
  text,
  primaryKey,
  check,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { classesTable } from "./classes";
import { resourcesTable } from "../rules/resources";

export const classesResourcesTable = pgTable(
  "class_resources",
  {
    classId: uuid("class_id").references(() => classesTable.id, {
      onDelete: "cascade",
    }),
    resourceId: text("resource_id").references(() => resourcesTable.id, {
      onDelete: "cascade",
    }),
    level: smallint("level"),
    amount: smallint("amount"),
  },
  (table) => [
    primaryKey({
      columns: [table.classId, table.resourceId, table.level],
    }),
    check(
      "valid_class_resources_level",
      sql`${table.level} >= 1 AND ${table.level} <= 20`,
    ),
  ],
);

export const classesResourcesRelations = relations(
  classesResourcesTable,
  ({ one }) => ({
    class: one(classesTable, {
      fields: [classesResourcesTable.classId],
      references: [classesTable.id],
    }),
    resource: one(resourcesTable, {
      fields: [classesResourcesTable.resourceId],
      references: [resourcesTable.id],
    }),
  }),
);
