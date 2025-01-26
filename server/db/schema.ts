import { index, jsonb, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const curriculum = pgTable(
  "curriculum",
  {
    id: uuid("id").defaultRandom().primaryKey(), // UUID como clave primaria
    userId: varchar("user_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    address: text("address").notNull(),
    education: jsonb("education").notNull(),
    experience: jsonb("experience").notNull(),
    skills: jsonb("skills").notNull(),
  },
  (curriculum) => {
    return {
      UserIdIndex: index("user_id_idx").on(curriculum.userId),
    };
  }
);

export type Curriculum = typeof curriculum.$inferSelect;
export type NewCurriculum = typeof curriculum.$inferInsert;
