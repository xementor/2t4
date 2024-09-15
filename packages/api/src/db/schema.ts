import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

// Car
export const NoteTable = pgTable('Note', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('userId').notNull(),
  content: text('content').notNull(),
})

export type Car = InferSelectModel<typeof NoteTable>
export type InsertCar = InferInsertModel<typeof NoteTable>
export const insertCarSchema = createInsertSchema(NoteTable)
export const selectCarSchema = createSelectSchema(NoteTable)
