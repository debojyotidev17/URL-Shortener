import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { user } from "./user.schema.js";
export const url = pgTable("url", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull().references(() => user.id),
    shortCode: varchar().notNull().unique(),
    Link: text().notNull().unique()
});
//# sourceMappingURL=url.schema.js.map