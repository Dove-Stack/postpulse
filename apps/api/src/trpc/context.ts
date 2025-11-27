import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma , type Prisma} from "@postpulse/db";

export type UserWithOrg = Prisma.UserGetPayload<{
  include: { org: true };
}>;

export async function createContext({
  req,
  res,
}: {
  req: FastifyRequest;
  res: FastifyReply;
}) {
  const auth = getAuth(req);

  let user: UserWithOrg | null = null;

    const baseContext = {
      req,
      res,
      prisma,
      auth: {
        userId: auth.userId,
        orgId: auth.orgId,
      },
    };

  if (auth.userId) {
    user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
      include: {
        org: true,
      },
    });
  }
  return {
    ...baseContext,
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;





