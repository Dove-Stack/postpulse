import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import superjson from "superjson";
import { ZodError } from "zod";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ZodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const middleware = t.middleware;
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;


