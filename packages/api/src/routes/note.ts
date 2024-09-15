import { parse, string, object } from 'valibot'
import { protectedProcedure, publicProcedure, router } from '../trpc'
import { NoteTable } from '../db/schema'

export const noteRouter = router({
  add: protectedProcedure
    .input((raw) => parse(object({ content: string() }), raw))
    .mutation(async ({ input, ctx }) => {
      const { content } = input

      await ctx.db.insert(NoteTable).values({ content, userId: ctx.user.id })
    }),
})
