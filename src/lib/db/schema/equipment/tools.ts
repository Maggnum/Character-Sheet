import { relations } from "drizzle-orm/relations";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { abilityScoreEnum } from "../enums/ability-score";
import { toolTypeEnum } from "../enums/tool";
import { equipmentTable } from "./equipment";

export const toolsTable = pgTable("tools", {
  id: uuid("id")
    .primaryKey()
    .references(() => equipmentTable.id, {
      onDelete: "cascade",
    }),
  type: toolTypeEnum("type").notNull(),
  abilityScore: abilityScoreEnum("ability_score"),
});

export const toolsRelation = relations(toolsTable, ({ one }) => ({
  equipment: one(equipmentTable, {
    fields: [toolsTable.id],
    references: [equipmentTable.id],
  }),
}));
