import { pgTable, uuid, text, smallint } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";
import { rechargePeriodEnum } from "../enums/recharge-period";
import { subclassesResourcesTable } from "../classes/subclasses";
import { classesResourcesTable } from "../classes/class-resources";

export const resourcesTable = pgTable("resources", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  level: smallint("level"),
  dieType: smallint("die_type"),
  rechargeOn: rechargePeriodEnum("recharge_on"),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
  description: text("description"),
});

export const resourcesRelations = relations(
  resourcesTable,
  ({ one, many }) => ({
    contentPack: one(contentPacksTable, {
      fields: [resourcesTable.contentPackId],
      references: [contentPacksTable.id],
    }),

    classes: many(classesResourcesTable),
    subclasses: many(subclassesResourcesTable),
  }),
);
