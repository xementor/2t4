import { protectedProcedure, router } from '../trpc'

export const userRouter = router({
  current: protectedProcedure.query(async ({ ctx }) => {}),
})
