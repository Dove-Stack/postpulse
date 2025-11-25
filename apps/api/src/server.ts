// import dotenv from "dotenv";
// dotenv.config();

import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { webhookRoutes } from "./routes/webhooks";

const port = Number(process.env.PORT) || 3001;
const host = process.env.NODE_ENV === "production" ? "0.0.0" : "127.0.0.1";

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
});

await server.register(import("fastify-raw-body"), {
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
  exclude: ["/webhooks"],
} as any);

server.register(webhookRoutes, { prefix: "webhooks" });

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
  return { status: "healthy", timeStamp: new Date().toISOString() };
});

const startServer = async () => {
  try {
    await server.listen({
      port,
      host,
    });
    console.log(`Server running -> http://localhost:3001`);
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
