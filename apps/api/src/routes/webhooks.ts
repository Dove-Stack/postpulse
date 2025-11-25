import { FastifyInstance } from "fastify";
import { Webhook } from "svix";
import {
  ClerkWebhookService,
  ClerkWebhookEvent,
} from "../services/clerk-webhook.service";
// import type { ClerkWebhookEvent } from "../types/clerk-webhook";

export async function webhookRoutes(server: FastifyInstance) {
  const webhookService = new ClerkWebhookService();

  server.post(
    "/clerk",
    { config: { rawBody: true } },
    async (request, reply) => {
      const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

      const payload = request.rawBody as string;

      if (!WEBHOOK_SECRET) {
        server.log.error("Missing CLERK_WEBHOOK_SECRET");
        return reply.code(500).send({ error: "Webhook secret not configured" });
      }

      const svixId = request.headers["svix-id"] as string;
      const svixTimeStamp = request.headers["svix-timestamp"] as string;
      const svixSignature = request.headers["svix-signature"] as string;

      if (!svixId || !svixTimeStamp || !svixSignature) {
        return reply.code(400).send({ error: "Missing svix headers" });
      }

      const wh = new Webhook(WEBHOOK_SECRET);
      let event: ClerkWebhookEvent;

      try {
        event = wh.verify(payload, {
          "svix-id": svixId,
          "svix-timestamp": svixTimeStamp,
          "svix-signature": svixSignature,
        }) as ClerkWebhookEvent;
      } catch (error) {
        server.log.error("Webhook verification failed:");
        return reply.code(400).send({ error: "Invalid signature" });
      }

      try {
        await webhookService.handleEvent(event);
        return reply.code(200).send({ sucess: true });
      } catch (error) {
        server.log.error("Webhook handler error:");
        return reply.code(500).send({ error: "Webhook processing failed" });
      }
    }
  );
}
