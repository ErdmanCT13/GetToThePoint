import { integer, pgTable, varchar, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const roomsTable = pgTable("rooms", {
  id: uuid().primaryKey(),
  arePointsRevealed: boolean(),
  creationDate: timestamp({withTimezone: false}).defaultNow(),
});

export const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  roomId: uuid().notNull().references(() => roomsTable.id),
  pointSelection: integer()
});