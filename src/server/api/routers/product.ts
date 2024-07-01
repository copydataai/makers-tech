import { z } from "zod";
import { ecommerceProducts } from "~/server/db/schema";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.select().from(ecommerceProducts);
    }),

    questionPrompt: publicProcedure
        .input(
            z.object({
                prompt: z.string(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const answer = await ctx.ollama.invoke(input.prompt);

            return answer;
        }),
});
