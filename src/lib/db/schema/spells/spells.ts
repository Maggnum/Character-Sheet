import {
  pgTable,
  uuid,
  text,
  boolean,
  check,
  smallint,
} from "drizzle-orm/pg-core";

import { relations, sql } from "drizzle-orm";
import { magicSchoolEnum } from "../enums/magic-schools";
import { contentPacksTable } from "../core/content-packs";
import { classesSpellsTable } from "../classes/class-spells";

export const spellsTable = pgTable(
  "spells",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    level: smallint("level").notNull(),
    school: magicSchoolEnum("school").notNull(),
    castingTime: text("casting_time").notNull(),
    range: text("range").notNull(),
    verbal: boolean("verbal").default(false),
    somatic: boolean("somatic").default(false),
    material: boolean("material").default(false),
    materialDescription: text("material_description"),
    duration: text("duration").notNull(),
    contentPackId: uuid("content_pack_id")
      .notNull()
      .references(() => contentPacksTable.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
  },
  (table) => [
    check(
      "spells_level_range",
      sql`${table.level} >= 0 AND ${table.level} <= 9`,
    ),
  ],
);

export const spellsRelations = relations(spellsTable, ({ one, many }) => ({
  contentPack: one(contentPacksTable, {
    fields: [spellsTable.contentPackId],
    references: [contentPacksTable.id],
  }),

  classes: many(classesSpellsTable),
}));
