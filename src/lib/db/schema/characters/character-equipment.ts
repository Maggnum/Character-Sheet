import { pgTable, primaryKey, smallint, text, uuid } from "drizzle-orm/pg-core";
import { charactersTable } from "./characters";
import { relations } from "drizzle-orm";
import { equipmentTable } from "../equipment/equipment";
import { currencyTable } from "../equipment/currency";

export const charactersEquipmentTable = pgTable(
  "characters_equipment",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    equipmentId: uuid("equipment_id").references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
    amount: smallint("amount").notNull(),
    note: text("note"),
  },
  (table) => [primaryKey({ columns: [table.characterId, table.equipmentId] })],
);

export const charactersEquipmentRelations = relations(
  charactersEquipmentTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [charactersEquipmentTable.characterId],
      references: [charactersTable.id],
    }),

    equipment: one(equipmentTable, {
      fields: [charactersEquipmentTable.equipmentId],
      references: [equipmentTable.id],
    }),
  }),
);

export const charactersCurrencyTable = pgTable(
  "characters_currency",
  {
    characterId: uuid("character_id").references(() => charactersTable.id, {
      onDelete: "cascade",
    }),
    currencyId: uuid("currency_id").references(() => currencyTable.id, {
      onDelete: "cascade",
    }),
    amount: smallint("amount").notNull(),
  },
  (table) => [primaryKey({ columns: [table.characterId, table.currencyId] })],
);

export const charactersCurrencyRelations = relations(
  charactersCurrencyTable,
  ({ one }) => ({
    character: one(charactersTable, {
      fields: [charactersCurrencyTable.characterId],
      references: [charactersTable.id],
    }),

    currency: one(currencyTable, {
      fields: [charactersCurrencyTable.currencyId],
      references: [currencyTable.id],
    }),
  }),
);
