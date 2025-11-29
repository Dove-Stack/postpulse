// import dotenv from "dotenv";
// dotenv.config();

import "dotenv/config";
import Fastify from "fastify";
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import cors from "@fastify/cors";
import { createContext } from "./trpc/context";
import { ClerkFastifyOptions, clerkPlugin, getAuth } from "@clerk/fastify";
import { appRouter, AppRouter } from "./trpc/app-router";
import { webhookRoutes } from "./routes/webhooks";
import { initSentry } from "./lib/sentry";
import { uptime } from "process";
import { flushLogs } from "./lib/logger";

initSentry();

const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },

  bodyLimit: 10 * 1024 * 1024,

  requestIdLogLabel: 'requestId',
  requestIdHeader: 'x-request-id',
  disableRequestLogging: false,
});

if (!process.env.SENTRY_DSN) {
  server.addHook('onRequest', (request, reply, done) => {
    Sentry.startSpan(
      {
        name: `${request.method} ${request.url}`,
        op: 'http-server',
        attributes: {
          'http.method': request.method,
          'http.url': request.url,
          'http.route': request.routeOptions.url,
        },
      },
      () => {
        done();
      }
    );
  });

  server.setErrorHandler((error, request, reply) => {
    const err = error instanceof Error ? error : new Error(String(error));

    const status =
      typeof (error as any).statusCode === 'number'
        ? (error as any).statusCode
        : 500;

    Sentry.captureException(err, {
      extra: {
        method: request.method,
        url: request.url,
        headers: request.headers,
        query: request.query,
        params: request.params,
      },
    });

    request.log.error(err);

    reply.status(status).send({
      error: {
        message: err.message,
        statusCode: status,
      },
    });
  });
}

await server.register(import('fastify-raw-body'), {
  field: "rawBody",
  global: false,
  encoding: "utf8",
  runFirst: true,
  routes: [],
});

await server.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
});

server.register(clerkPlugin, {
  exclude: ["/webhooks/clerk", "/health"],
} as ClerkFastifyOptions);

server.register(webhookRoutes, { prefix: "webhooks" });

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error, type, ctx }) {
      server.log.error(
        {
          path,
          type,
          error: {
            message: error.message,
            code: error.code,
            cause: error.cause,
          },
          userId: ctx?.auth?.userId,
          orgId: ctx?.auth?.orgId,
        },
        `❌ tRPC Error on ${path}`
      );
    },
  },
} satisfies FastifyTRPCPluginOptions<AppRouter>);

server.get("/", async () => {
  return { message: "PostPulse API is running" };
});

server.get("/api/me", async (request, reply) => {
  const { userId, orgId } = getAuth(request);

  if (!userId) {
    return reply.status(401).send({ error: "Login required" });
  }

  return {
    userId,
    orgId,
    message: "You are authenticated ",
  };
});

server.get("/health", async () => {
  return {
    status: "healthy",
    timeStamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    services: {
      axiom: !!process.env.AXIOM_TOKEN,
      sentry: !!process.env.SENTRY_DSN,
      redis: !!process.env.UPSTASH_REDIS_REST_URL,
    },
  };
});

async function gracefulShutdown(signal: string) {
  console.log(`\n${signal} recieved. Shuttin down now...`);

  await flushLogs();
  await server.close();

  console.log("Server shut down complete");
  process.exit(0);
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

const startServer = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    const host = process.env.NODE_ENV === "production" ? "0.0.0" : "127.0.0.1";

    await server.listen({
      port,
      host,
    });

    console.log("PostPulse API is running");
    console.log(`Environment --> ${process.env.NODE_ENV}`);
    console.log(`Server running --> http://${host}:${port}`);
    console.log(`tRPC --> http://${host}:${port}/trpc`);
    console.log(`tRPC --> http://${host}:${port}/trpc`);
    console.log(`Health --> http://${host}:${port}/health`);

    if (process.env.AXIOM_TOKEN) {
      console.log("Axiom logging enabled");
    }
    if (process.env.SENTRY_DSN) {
      console.log("Sentry error tracking enabled");
    }
    if (process.env.UPSTASH_REDIS_REST_URL)
      console.log("Upstash rate limiting enabled");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();

// import * as dotenv from "dotenv";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import Fastify from "fastify";
// import cors from "@fastify/cors";
// import { clerkPlugin, getAuth } from "@clerk/fastify";
// import { webhookRoutes } from "./routes/webhooks.js";
// import { router } from './trpc/trpc';
// import { appRouter } from "./trpc/app-router";

// // --- FIX: Smart .env Loading ---
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // We will search these paths in order
// const envCandidates = [
//   path.resolve(__dirname, "../.env"), // Look in apps/api/.env
//   path.resolve(__dirname, "../../../.env"), // Look in monorepo root (.env)
// ];

// let envPath = null;

// console.log("--- 🔍 Searching for .env file ---");
// for (const candidate of envCandidates) {
//   if (fs.existsSync(candidate)) {
//     envPath = candidate;
//     console.log(`✅ Found .env at: ${candidate}`);
//     dotenv.config({ path: candidate });
//     break; // Stop once we find one
//   } else {
//     console.log(`❌ No .env at:    ${candidate}`);
//   }
// }
// console.log("----------------------------------");

// // --- Debug Check ---
// if (!process.env.CLERK_PUBLISHABLE_KEY) {
//   console.error(
//     "\n🚨 ERROR: .env file found, but CLERK_PUBLISHABLE_KEY is missing!"
//   );
//   console.error("Please ensure your .env file contains:");
//   console.error("CLERK_PUBLISHABLE_KEY=pk_test_...");
//   console.error("CLERK_SECRET_KEY=sk_test_...\n");
//   process.exit(1);
// }

// const port = Number(process.env.PORT) || 3001;
// const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

// const server = Fastify({
//   logger: {
//     transport: {
//       target: "pino-pretty",
//       options: {
//         colorize: true,
//         translateTime: "HH:MM:ss Z",
//         ignore: "pid,hostname",
//       },
//     },
//   },
// });

// await server.register(cors, {
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   credentials: true,
// });

// server.register(clerkPlugin, {
//   publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
//   secretKey: process.env.CLERK_SECRET_KEY,
//   exclude: ["/webhooks/clerk"],
// } as any);

// server.register(webhookRoutes);

// server.get("/", async () => {
//   return { message: "PostPulse API is running" };
// });

// server.get("/api/me", async (request, reply) => {
//   const { userId, orgId } = getAuth(request);

//   if (!userId) {
//     return reply.status(401).send({ error: "Login required" });
//   }

//   return {
//     userId,
//     orgId,
//     message: "You are authenticated ",
//   };
// });

// server.get("/health", async () => {
//   return { status: "healthy", timeStamp: new Date().toISOString() };
// });

// const startServer = async () => {
//   try {
//     await server.listen({
//       port,
//       host,
//     });
//     console.log(`Server running -> http://${host}:${port}`);
//   } catch (err) {
//     server.log.error(err);
//     process.exit(1);
//   }
// };

// startServer();
