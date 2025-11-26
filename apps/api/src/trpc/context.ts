import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@postpulse/db";

export async function createContext({req, res}:{req: FastifyRequest, res: FastifyReply}) {
    const auth = getAuth(req);

    const baseContext = {
        req,
        res,
        prisma,
        auth: {
            userId: auth.userId,
            orgId: auth.orgId
        }
    }

    if (auth.userId) {
        const user = await prisma.user.findUnique({
            where: { clerkId: auth.userId},
            include: {
                org: true
            },
        })

        return {
            ...baseContext,
            user,
        }
    }

    return baseContext
}

export type Context = Awaited<ReturnType<typeof createContext>>