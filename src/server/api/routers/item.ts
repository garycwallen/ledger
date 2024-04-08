import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const itemRouter = createTRPCRouter({
  // Create new Shopping Item
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.shoppingItem.create({
        data: {
          name: input.name,
        },
      });
    }),

  // Get All Shopping Items
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.shoppingItem.findMany({
      orderBy: { id: "desc" },
    });
  }),
});
