/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const transcationRouter = createTRPCRouter({
  // Create new Transcation
  create: protectedProcedure
    .input(z.object({ type: z.string() }))
    .input(z.object({ amount: z.string() }))
    .input(z.object({ location: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transcation.create({
        data: {
          type: input.type,
          amount: input.amount,
          location: input.location,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  // Get All Transcations
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.transcation.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Return Latest Transcation
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.transcation.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
