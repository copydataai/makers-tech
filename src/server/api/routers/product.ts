import { z } from "zod";
import { ecommerceProducts } from "~/server/db/schema";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

const IMPROVED_PROMPT =
    "Act as a friendly, helpful sales assistant representing Brightspeed. Focus conversations on helping customers understand our broadband internet services and identifying the best package options to meet their needs and budget, while building trust through good listening and understanding. If asked something unrelated, gently redirect the conversation. If unsure of an answer, politely state you'll need to gather more info and follow up. Provide service with patience, honesty and care. also use the memory chat_history for answering questions and use this: {context} \n HUMAN: ";

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
            const result = await ctx.ollama.invoke(input.prompt);
            const answers = result.answer.split("\n");
            const productId = answers[2].split(" ")[2];
            const product = await ctx.db
                .select()
                .from(ecommerceProducts)
                .where("product_id", productId)
                .limit(1);

            const textProduct = JSON.stringify(product[0]);

            const fullPrompt = IMPROVED_PROMPT.replace(
                "{context}",
                textProduct,
            );
            const finalAnswer = await ctx.ollama.invoke(
                fullPrompt + input.prompt,
            );

            return answer;
        }),
});
