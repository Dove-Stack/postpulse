import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type { Context } from "./context";
import { isUserAuthenticated, logger, requireOrganization } from "./middleware";

const t = initTRPC.context<Context>().create({
  transformer: superjson,

  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const middleware = t.middleware;

export const publicProcedure = t.procedure.use(logger);

export const protectedProcedure = t.procedure.use(logger).use(isUserAuthenticated);

export const orgProcedure = t.procedure.use(logger).use(requireOrganization);


export const mergeRouters = t.mergeRouters
