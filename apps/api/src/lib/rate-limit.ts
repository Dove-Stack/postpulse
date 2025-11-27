import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { TRPCError } from "@trpc/server";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export const rateLimiters = {
  free: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, "15 m"),
        analytics: true,
        prefix: "ratelimit:free",
      })
    : null,

  pro: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(1000, "15 m"),
        analytics: true,
        prefix: "ratelimit:pro",
      })
    : null,

  enterprise: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10000, "15 m"),
        analytics: true,
        prefix: "ratelimit:enterprise",
      })
    : null,
};

export async function checkRateLimit(
  indetifier: string,
  tier: "FREE" | "PRO" | "ENTERPRISE" = "FREE"
) {
  if (process.env.NODE_ENV !== "production" || !redis) {
    return { success: true, remaining: 999, reset: 0 };
  }

  const limiter =
    tier === "PRO"
      ? rateLimiters.pro
      : tier === "ENTERPRISE"
      ? rateLimiters.enterprise
      : rateLimiters.free;

  if (!limiter) {
    return { success: true, remaining: 999, reset: 0 };
  }

  const { success, limit, remaining, reset } = await limiter.limit(indetifier);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Rate limit exceeded. You have used ${limit} requests. Try again in ${retryAfter} seconds.`,
    });
  }

  return { success, remaining, reset };
}

export async function getRateLimitAnalytics(identifier: string) {
  if (!redis) return null;

  const key = `ratelimit:analytics:${identifier}`;
  const data = await redis.get(key);
  return data;
}
