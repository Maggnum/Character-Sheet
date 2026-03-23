import { pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";
import { equipmentTable } from "./equipment";
import { relations } from "drizzle-orm";

export const poisonTypesTable = pgTable("poison_type", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
});

export const poisonTypesRelation = relations(poisonTypesTable, ({ many }) => ({
  poisons: many(poisonsTable),
}));

export const poisonsTable = pgTable("poisons", {
  id: uuid("id")
    .primaryKey()
    .references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
  typeId: uuid("type_id")
    .notNull()
    .references(() => poisonTypesTable.id),
  effect: text("effect").notNull(),
  savingThrowDC: smallint("saving_throw_dc"),
});

export const poisonsRelation = relations(poisonsTable, ({ one }) => ({
  equipment: one(equipmentTable, {
    fields: [poisonsTable.id],
    references: [equipmentTable.id],
  }),

  type: one(poisonTypesTable, {
    fields: [poisonsTable.typeId],
    references: [poisonTypesTable.id],
  }),
}));
