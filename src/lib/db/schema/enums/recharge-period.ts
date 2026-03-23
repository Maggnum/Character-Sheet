import { pgEnum } from "drizzle-orm/pg-core";
import z from "zod";

export const rechargePeriods = ["short rest", "long rest"] as const;

export const rechargePeriodEnum = pgEnum("recharge_period", rechargePeriods);
export const rechargePeriodSchema = z.enum(rechargePeriods);

export type RechargePeriod = (typeof rechargePeriods)[number];
