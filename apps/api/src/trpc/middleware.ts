import { TRPCError } from "@trpc/server";
import {middleware} from "./root";
import { forbidden, unauthorized } from "./error";
import { captureException, setUser } from "@/lib/sentry";

import { logToAxiom } from "@/lib/logger";
import { checkRateLimit } from "@/lib/rate-limit";


export const isUserAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw unauthorized;
  }

  if (!ctx.user) {
    const error = new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'user not found in database. Please contact support.',
    });
    captureException(error, {
      userId: ctx.auth.userId,
      context: 'isUserAuthenticated middleware',
    });
    throw error;
  }

  setUser({
    id: ctx.user.clerkId,
    email: ctx.user.email,
    username: `${ctx.user.firstName} ${ctx.user.lastName}`.trim(),
    orgId: ctx.user.orgId ?? undefined,
  });

  addBreadCrumb(
    'User authenticated',
    {
      userId: ctx.user.clerkId,
      orgId: ctx.user.orgId,
    },
    'auth'
  );

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
    const error = new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "User not found in database",
    });
    captureException(error, { userId: ctx.auth.userId });
    throw error;
  }

  setTags({
    org_id: ctx.auth.orgId,
    org_name: ctx.user.org?.name ?? 'none',
    org_plan: ctx.user.org?.plan ?? 'none',
  });

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

  const requestId = ctx.req.id;

  addBreadCrumb(
    `${type} ${path} started`,
    {
      requestId,
      userId: ctx.auth.userId,
      orgId: ctx.auth.orgId,
    },
    'request'
  );

  let result: Awaited<ReturnType<typeof next>>;

  try {
    result = await next();
    const duration = Date.now() - start;

    const logData = {
      requestId,
      type,
      path,
      duration,
      userId: ctx.auth.userId,
      orgId: ctx.auth.orgId,
      success: result.ok,
      timeStamp: new Date().toISOString(),
      userAgent: ctx.req.headers["user-agent"],
      ip: ctx.req.ip,
    };

    if (result.ok) {
      ctx.req.log.info(logData, `${type} ${path} completed in ${duration}ms`);
      await logToAxiom("info", `${type} ${path} completed`, logData);
    } else {
      ctx.req.log.error(
        { ...logData, error: result.error },
        `${type} ${path} failed`
      );
      await logToAxiom("error", `${type} ${path} failed`, {
        ...logData,
        error: {
          message: result.error.message,
          code: result.error.code,
          cause: result.error.cause,
        },
      });
      captureException(new Error(result.error.message), logData);
    }
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    ctx.req.log.error(
      { error, path, type, duration },
      `${type} ${path} crashed`
    );

    if (error instanceof Error) {
      captureException(error, {
        requestId,
        path,
        type,
        userId: ctx.auth.userId,
        orgId: ctx.auth.orgId,
      });

      await logToAxiom("error", `${type} ${path} crashed`, {
        requestId,
        path,
        type,
        error: error.message,
        stack: error.stack,
      });
    }

    throw error;
  }
});

export const rateLimit = middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    return next();
  }

  const plan = ctx.user?.org?.plan || "FREE";

  const indetifier = `${ctx.auth.userId}:${ctx.auth.orgId || "no-org"}`;

  const { remaining } = await checkRateLimit(indetifier, plan);

  ctx.res.header("X-RateLimit-Remaining", remaining.toString());

  return next();
});

// const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// export const rateLimit = (options: { max: number; windowMs: number }) =>
//   middleware(async ({ ctx, next }) => {
//     if (!ctx.auth.userId) {
//       return next();
//     }

//     const key = `${ctx.auth.userId}:${ctx.auth.orgId || "no-org"}`;
//     const now = Date.now();
//     const limit = rateLimitMap.get(key);

//     if (limit && now < limit.resetAt) {
//       if (limit.count >= options.max) {
//         const retryAfter = Math.ceil((limit.resetAt - now) / 1000);
//         throw new TRPCError({
//           code: "TOO_MANY_REQUESTS",
//           message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
//         });
//       }
//       limit.count++;
//     } else {
//       rateLimitMap.set(key, {
//         count: 1,
//         resetAt: now + options.windowMs,
//       });
//     }
//     return next();
//   });
