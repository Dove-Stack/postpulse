import { postRouter } from "@/routers/post.router";
import { router } from "./trpc";


import { publicProcedure } from "./trpc";

export const healthRouter = router({
  ping: publicProcedure.query(() => {
    return { status: "ok", time: new Date().toISOString() };
  }),
});

export const appRouter = router({
    post: postRouter,
})

export type AppRouter = typeof appRouter