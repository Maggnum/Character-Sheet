import { relations } from "drizzle-orm/relations";
import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { equipmentTable } from "./equipment";
import { magicItemLevelEnum, magicItemTypeEnum } from "../enums/magic-items";

export const magicItemsTable = pgTable("magic_items", {
  id: uuid("id")
    .primaryKey()
    .references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
  level: magicItemLevelEnum("level").notNull(),
  type: magicItemTypeEnum("type").notNull(),
  requireAttunement: boolean("require_attunement").default(false),
  addBaseCost: boolean("add_base_cost").default(false),
});

export const magicItemsRelation = relations(magicItemsTable, ({ one }) => ({
  equipment: one(equipmentTable, {
    fields: [magicItemsTable.id],
    references: [equipmentTable.id],
  }),
}));
