import { pgTable, uuid, primaryKey, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { equipmentTable } from "../equipment/equipment";
import { currencyTable } from "./currency";

export const equipmentKitsTable = pgTable("equipment_kits", {
  id: uuid("id")
    .primaryKey()
    .references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
  coinValue: integer("coin_value"),
  currencyId: uuid("currency_id").references(() => currencyTable.id, {
    onDelete: "set null",
  }),
});

export const equipmentKitsRelations = relations(
  equipmentKitsTable,
  ({ many, one }) => ({
    equipments: many(equipmentKitsEquipmentTable),

    cost_currency: one(currencyTable, {
      fields: [equipmentKitsTable.currencyId],
      references: [currencyTable.id],
    }),
  }),
);

export const equipmentKitsEquipmentTable = pgTable(
  "equipment_kits_equipment",
  {
    kitId: uuid("kit_id")
      .notNull()
      .references(() => equipmentKitsTable.id, { onDelete: "cascade" }),
    equipmentId: uuid("equipment_id")
      .notNull()
      .references(() => equipmentTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.kitId, table.equipmentId],
    }),
  ],
);

export const equipmentKitsEquipmentRelations = relations(
  equipmentKitsEquipmentTable,
  ({ one }) => ({
    kit: one(equipmentKitsTable, {
      fields: [equipmentKitsEquipmentTable.kitId],
      references: [equipmentKitsTable.id],
    }),

    equipment: one(equipmentTable, {
      fields: [equipmentKitsEquipmentTable.equipmentId],
      references: [equipmentTable.id],
    }),
  }),
);
