import { pgTable, uuid, text, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";
import { featuresTable } from "../rules/features";
import { originFeatsTable } from "../feats/origin-feats";
import { generalFeatsTable } from "../feats/general-feats";
import { fightingStyleFeatsTable } from "../feats/fighting-style-feats";
import { speciesTable } from "../species/species";
import { languagesTable } from "../rules/languages";
import { spellsTable } from "../spells/spells";
import { currencyTable } from "../equipment/currency";
import { equipmentTable } from "../equipment/equipment";
import { trinketsTable } from "../equipment/trinkets";
import {
  weaponMasteriesTable,
  weaponPropertiesTable,
} from "../equipment/weapons";
import { backgroundsTable } from "../backgrounds/backgrounds";
import { resourcesTable } from "../rules/resources";
import { classesTable } from "../classes/classes";
import { subclassesTable } from "../classes/subclasses";

export const contentPackTypeEnum = pgEnum("content_pack_type", [
  "core",
  "official_expansion",
  "community_expansion",
  "homebrew",
  "player_specific",
]);

export const contentPacksTable = pgTable("content_packs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  type: contentPackTypeEnum("type").notNull(),
  creatorId: uuid("creator_id").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  description: text("description"),
});

export const contentPacksRelations = relations(
  contentPacksTable,
  ({ many, one }) => ({
    enabledByUsers: many(userEnabledPacksTable),
    creator: one(usersTable),

    features: many(featuresTable),
    resources: many(resourcesTable),
    languages: many(languagesTable),

    species: many(speciesTable),
    spells: many(spellsTable),
    backgrounds: many(backgroundsTable),
    classes: many(classesTable),
    subclasses: many(subclassesTable),

    generalFeats: many(generalFeatsTable),
    originFeats: many(originFeatsTable),
    fightingStyleFeats: many(fightingStyleFeatsTable),

    currency: many(currencyTable),
    equipments: many(equipmentTable),
    trinkets: many(trinketsTable),
    weaponMasteries: many(weaponMasteriesTable),
    weaponProperties: many(weaponPropertiesTable),
  }),
);

export const userEnabledPacksTable = pgTable(
  "user_enabled_packs",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    packId: uuid("pack_id")
      .notNull()
      .references(() => contentPacksTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.packId],
    }),
  ],
);

export const userEnabledPacksRelations = relations(
  userEnabledPacksTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userEnabledPacksTable.userId],
      references: [usersTable.id],
    }),

    pack: one(contentPacksTable, {
      fields: [userEnabledPacksTable.packId],
      references: [contentPacksTable.id],
    }),
  }),
);
