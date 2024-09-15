import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { numeric, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot'

// Car
export const NoteTable = pgTable('Note', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('userId').notNull(),
  content: text('content').notNull(),
})

// User
export const UserTable = pgTable('User', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
})

export type User = InferSelectModel<typeof UserTable>
export type InsertUser = InferInsertModel<typeof UserTable>
export const insertUserSchema = createInsertSchema(UserTable)
export const selectUserSchema = createSelectSchema(UserTable)

// Car
export const CarTable = pgTable('Car', {
  id: text('id').primaryKey(),
  make: varchar('make').notNull(),
  model: varchar('model').notNull(),
  year: numeric('year').notNull(),
  color: text('color').notNull(),
  price: numeric('price').notNull(),
  mileage: numeric('mileage').notNull(),
  fuelType: text('fuelType').notNull(),
  transmission: varchar('transmission').notNull(),
})

export type Car = InferSelectModel<typeof CarTable>
export type InsertCar = InferInsertModel<typeof CarTable>
export const insertCarSchema = createInsertSchema(CarTable)
export const selectCarSchema = createSelectSchema(CarTable)
