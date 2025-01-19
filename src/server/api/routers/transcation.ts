import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const transcationRouter = createTRPCRouter({
  // Create new Transaction
  create: protectedProcedure
    .input(z.object({ type: z.string() }))
    .input(z.object({ amount: z.coerce.number() }))
    .input(z.object({ location: z.string() }))
    .input(z.object({ createdAt: z.coerce.date() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transcation.create({
        data: {
          type: input.type,
          amount: input.amount,
          location: input.location,
          createdAt: input.createdAt,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  // Get All Transactions
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.transcation.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Return Transactions by Location
  getByLocation: protectedProcedure
    .input(z.object({ location: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.transcation.findMany({
        orderBy: { createdAt: "desc" },
        where: { location: input.location },
      });
    }),

  // Return Latest Transaction
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.transcation.findFirst({
      orderBy: { id: "desc" },
    });
  }),

  // Add delete procedure
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transcation.delete({
        where: {
          id: input.id,
          // TODO: Add back later
          // createdBy: { id: ctx.session.user.id }, // Ensure user can only delete their own transactions
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
