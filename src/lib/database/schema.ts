import { integer, pgTable, varchar, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
//import { boolean, date } from 'drizzle-orm/mysql-core';
//import { sql } from "drizzle-orm";
//import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';


export const roomsTable = pgTable("rooms", {
  id: uuid().primaryKey(),
  arePointsRevealed: boolean().notNull(),
  creationDate: timestamp({withTimezone: false}).defaultNow().notNull(),
});

export const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  displayName: varchar({ length: 255 }).notNull(),
  roomId: uuid().notNull().references(() => roomsTable.id),
  pointSelection: integer().notNull()
});

// export const roomsTable = sqliteTable("rooms", {
//   id: text().primaryKey(),
//   arePointsRevealed: integer({mode: "boolean"}).notNull(),
//   creationDate: integer({mode: "timestamp"}).default(sql`(CURRENT_TIMESTAMP)`).notNull()
// });

// export const usersTable = sqliteTable("users", {
//   id: text().primaryKey(),
//   displayName: text().notNull(),
//   roomId: text().notNull().references(() => roomsTable.id),
//   pointSelection: integer().notNull()
// });