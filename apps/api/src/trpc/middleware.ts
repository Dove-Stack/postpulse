import { TRPCError } from "@trpc/server";
import { middleware } from "./trpc";
import { forbidden, unauthorized } from "./error";

export const isUserAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw unauthorized;
  }

  if (!ctx.user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "user not found in database. Please contact support.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const requireOrganization = middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw unauthorized();
  }

  if (!ctx.auth.orgId) {
    throw forbidden(
      "You must be part of an organization to access this resource"
    );
  }

  if (!ctx.user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "user not found in database",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      orgId: ctx.auth.orgId,
    },
  });
});

export const logger = middleware(async ({ ctx, next, path, type }) => {
  const start = Date.now();

  const result = await next();

  const duration = Date.now() - start;

  const logData = {
    type,
    path,
    duration,
    userId: ctx.auth.userId,
    orgId: ctx.auth.orgId,
    success: result.ok,
    timestamp: new Date().toISOString(),
  };

  if (result.ok) {
    ctx.req.log.info(logData, `${type} ${path} completed in ${duration}ms`);
  } else {
    ctx.req.log.error(
      { ...logData, error: result.error },
      `${type} ${path} failed`
    );
  }

  return result;
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export const rateLimit = (options: { max: number; windowMs: number }) =>
  middleware(async ({ ctx, next }) => {
    if (!ctx.auth.userId) {
      return next();
    }

    const key = `${ctx.auth.userId}:${ctx.auth.orgId || "no-org"}`;
    const now = Date.now();
    const limit = rateLimitMap.get(key);

    if (limit && now < limit.resetAt) {
      if (limit.count >= options.max) {
        const retryAfter = Math.ceil((limit.resetAt - now) / 1000);
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
        });
      }
      limit.count++;
    } else {
      rateLimitMap.set(key, {
        count: 1,
        resetAt: now + options.windowMs,
      });
    }
    return next();
  });



