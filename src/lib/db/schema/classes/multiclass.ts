import { pgTable, smallint, uuid } from "drizzle-orm/pg-core";
import { classesTable } from "./classes";
import { relations } from "drizzle-orm";

export const multiclassTable = pgTable("multiclass", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom()
    .references(() => classesTable.id, { onDelete: "cascade" }),
  skillProficienciesAmount: smallint("skill_proficiencies_amount").notNull(),
  toolProficienciesAmount: smallint("tool_proficiencies_amount").notNull(),
});

export const multiclassRelations = relations(multiclassTable, ({ one }) => ({
  class: one(classesTable, {
    fields: [multiclassTable.id],
    references: [classesTable.id],
  }),
}));
