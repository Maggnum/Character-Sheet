import { relations } from "drizzle-orm/relations";
import { boolean, pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";
import { equipmentTable } from "./equipment";
import { armorTypeEnum } from "../enums/armor";

export const armorTable = pgTable("armor", {
  id: uuid("id")
    .primaryKey()
    .references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
  type: armorTypeEnum("type").notNull(),
  baseArmorClass: smallint("base_armor_class").notNull(),
  addDexterity: boolean("add_dexterity").notNull().default(true),
  strengthNedded: smallint("strength_nedded"),
  disadvantageOnStealth: boolean("disadvantage_on_stealth")
    .notNull()
    .default(false),
  donTime: text("don_time").notNull(),
  doffTime: text("doff_time").notNull(),
});

export const armorRelation = relations(armorTable, ({ one }) => ({
  equipment: one(equipmentTable, {
    fields: [armorTable.id],
    references: [equipmentTable.id],
  }),
}));
