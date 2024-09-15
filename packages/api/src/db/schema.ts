import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm'
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

// Car
export const CarTable = sqliteTable('Car', {
  id: text('id').primaryKey(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  color: text('color').notNull(),
  price: real('price').notNull(),
  mileage: integer('mileage').notNull(),
  fuelType: text('fuelType').notNull(),
  transmission: text('transmission').notNull(),
})

export type Car = InferSelectModel<typeof CarTable>
export type InsertCar = InferInsertModel<typeof CarTable>
export const insertCarSchema = createInsertSchema(CarTable)
export const selectCarSchema = createSelectSchema(CarTable)

// Note
export const NoteTable = sqliteTable('Note', {
  id: integer('id').primaryKey(),
  userId: text('user_id').notNull(),
  content: text('text').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})

export type Note = InferSelectModel<typeof NoteTable>
