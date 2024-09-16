import { eq } from 'drizzle-orm'
import { object, parse, string } from 'valibot'
import { NoteTable } from '../db/schema'
import { protectedProcedure, router } from '../trpc'

export const noteRouter = router({
  add: protectedProcedure
    .input((raw) => parse(object({ content: string() }), raw))
    .mutation(async ({ input, ctx }) => {
      const { content } = input

      await ctx.db.insert(NoteTable).values({ content, userId: ctx.user.id })
    }),

  userNotes: protectedProcedure.query(async ({ ctx }) => {
    const notes = await ctx.db.query.NoteTable.findMany({
      where: eq(NoteTable.userId, ctx.user.id),
    })
    return notes
  }),
})
