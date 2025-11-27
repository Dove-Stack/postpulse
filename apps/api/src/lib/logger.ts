import { Axiom } from "@axiomhq/js";
import pino from "pino";

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN!,
  orgId: process.env.AXIOM_ORG_ID,
});

const dataset = process.env.AXIOM_DATASET || "postpulse-logs";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: `pid, hostname`,
          },
        }
      : undefined,
});

export async function logToAxiom(
  level: "info" | "warn" | "error",
  message: string,
  metadata: Record<string, any> = {}
) {
  if (process.env.NODE_ENV !== "production" || !process.env.AXIOM_TOKEN) {
    return;
  }

  try {
    await axiom.ingest(dataset, [
      {
        _time: new Date().toISOString(),
        level,
        message,
        environment: process.env.NODE_ENV,
        service: "postpulse-api",
        ...metadata,
      },
    ]);
  } catch (error) {
    logger.error({ error }, "Failed to send logs to axiom");
  }
}

export async function flushLogs() {
  if (process.env.NODE_ENV === "production" && process.env.AXIOM_TOKEN) {
    await axiom.flush();
  }
}

process.on("SIGINT", async () => {
  await flushLogs();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await flushLogs();
  process.exit(0);
});
