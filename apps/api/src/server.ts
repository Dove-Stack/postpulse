import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { timeStamp } from "node:console";

dotenv.config();

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

await server.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
});

await server.register(clerkPlugin);

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
