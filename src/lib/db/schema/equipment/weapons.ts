import { pgTable, primaryKey, smallint, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { contentPacksTable } from "../core/content-packs";
import { equipmentTable } from "./equipment";
import { weaponCategoryEnum, weaponTypesEnum } from "../enums/weapon";
import { damageTypeEnum } from "../enums/damage-type";

export const weaponMasteriesTable = pgTable("weapon_masteries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
});

export const weaponMasteriesRelations = relations(
  weaponMasteriesTable,
  ({ one }) => ({
    contentPack: one(contentPacksTable, {
      fields: [weaponMasteriesTable.contentPackId],
      references: [contentPacksTable.id],
    }),
  }),
);

export const weaponPropertiesTable = pgTable("weapon_properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  contentPackId: uuid("content_pack_id")
    .notNull()
    .references(() => contentPacksTable.id, { onDelete: "cascade" }),
});

export const weaponPropertiesRelations = relations(
  weaponPropertiesTable,
  ({ one }) => ({
    contentPack: one(contentPacksTable, {
      fields: [weaponPropertiesTable.contentPackId],
      references: [contentPacksTable.id],
    }),
  }),
);

export const ammunitionsTable = pgTable("ammunitions", {
  id: uuid("id")
    .primaryKey()
    .references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
  amount: smallint("amount").notNull(),
  storage: text("storage"),
});

export const ammunitionsRelation = relations(ammunitionsTable, ({ one }) => ({
  equipment: one(equipmentTable, {
    fields: [ammunitionsTable.id],
    references: [equipmentTable.id],
  }),
}));

export const weaponsTable = pgTable("weapons", {
  id: uuid("id")
    .primaryKey()
    .references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
  category: weaponCategoryEnum("category").notNull(),
  type: weaponTypesEnum("type").notNull(),
  dieAmount: smallint("die_amount"),
  dieType: smallint("die_type"),
  damageType: damageTypeEnum("damage_type"),
  masteryId: uuid("mastery_id").references(() => weaponMasteriesTable.id, {
    onDelete: "set null",
  }),
});

export const weaponsRelation = relations(weaponsTable, ({ one, many }) => ({
  equipment: one(equipmentTable, {
    fields: [weaponsTable.id],
    references: [equipmentTable.id],
  }),

  mastery: one(weaponMasteriesTable, {
    fields: [weaponsTable.masteryId],
    references: [weaponMasteriesTable.id],
  }),

  properties: many(weaponWeaponPropertiesTable),
}));

export const weaponWeaponPropertiesTable = pgTable(
  "weapon_weapon_properties",
  {
    propertyId: uuid("property_id")
      .notNull()
      .references(() => weaponPropertiesTable.id, { onDelete: "cascade" }),
    weaponId: uuid("weapon_id")
      .notNull()
      .references(() => weaponsTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.propertyId, table.weaponId],
    }),
  ],
);

export const weaponWeaponPropertiesRelations = relations(
  weaponWeaponPropertiesTable,
  ({ one }) => ({
    property: one(weaponPropertiesTable, {
      fields: [weaponWeaponPropertiesTable.propertyId],
      references: [weaponPropertiesTable.id],
    }),

    weapon: one(weaponsTable, {
      fields: [weaponWeaponPropertiesTable.weaponId],
      references: [weaponsTable.id],
    }),
  }),
);
