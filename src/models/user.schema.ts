import { integer, pgTable, varchar, text, pgEnum } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
});
