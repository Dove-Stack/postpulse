import { TRPCError } from "@trpc/server";

export const ErrorCode = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",

  BAD_REQUEST: "BAD_REQUEST",
  VALIDATION_ERROR: "BAD_REQUEST",

  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",

  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",

  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  TIMEOUT: "TIMEOUT",
} as const;

export function unauthorized(
  message = "You must be logged in to access this resource"
) {
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message,
  });
}

export function forbidden(
  message = "You do not have permission to access this resource"
) {
  throw new TRPCError({
    code: "FORBIDDEN",
    message,
  });
}

export function notFound(resource: string) {
  throw new TRPCError({
    code: "NOT_FOUND",
    message: `${resource} not found`,
  });
}

export function validationError(message: string) {
  throw new TRPCError({
    code: "BAD_REQUEST",
    message,
  });
}

export function conflict(message: string) {
  throw new TRPCError({
    code: "CONFLICT",
    message,
  });
}

export function rateLimitExceeded(retryAfter?: number) {
  throw new TRPCError({
    code: "TOO_MANY_REQUESTS",
    message: `Rate limit exceeded. ${
      retryAfter
        ? `Try again in ${retryAfter} seconds.`
        : `Please try again later`
    }`,
  });
}

export function internalServerError(
  message = "An unexpected error occured on the server"
) {
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message,
  });
}

export function timeout(message = "The requests timed out ") {
  throw new TRPCError({
    code: "TIMEOUT",
    message,
  });
}
