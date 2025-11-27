import { TRPCError } from '@trpc/server';
import { router, orgProcedure } from "../trpc/trpc";
import { z } from "zod";
import { forbidden, notFound } from '@/trpc/error';


const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Content cannot be empty")
    .max(5000, "Content too long"),
  mediaUrls: z
    .array(z.string().url())
    .max(10, "Maximum 10 media files")
    .optional(),
  platforms: z
    .array(z.enum(["TWITTER", "LINKEDIN", "FACEBOOK", "INSTAGRAM"]))
    .min(1, "Select at least one platform"),
  scheduledAt: z.coerce.date().refine((date) => date > new Date(), {
    message: "Scheduled time must be in the future",
  }),
});

const updatePostSchema = z.object({
  id: z.string().cuid(),
  content: z.string().min(1).max(5000).optional(),
  mediaUrls: z.array(z.string().url()).max(10).optional(),
  platforms: z
    .array(z.enum(["TWITTER", "LINKEDIN", "FACEBOOK", "INSTAGRAM"]))
    .optional(),
  scheduledAt: z.coerce.date().optional(),
});

const deletePostSchema = z.object({
  id: z.string().cuid(),
});

const getPostSchema = z.object({
  id: z.string().cuid(),
});

const listPostSchema = z.object({
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().cuid().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "FAILED"]).optional(),
});

export const postRouter = router({
  create: orgProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          content: input.content,
          mediaUrls: input.mediaUrls || [],
          platforms: input.platforms,
          scheduledAt: input.scheduledAt,
          orgId: ctx.orgId,
          status: "SCHEDULED",
        },
      });

      ctx.req.log.info({ postId: post.id }, "Post Created");

      return post;
    }),

  update: orgProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx, input }) => {
        const existingPost = await ctx.prisma.post.findUnique({
            where: {id: input.id}
        })

        if(!existingPost) {
            throw notFound('Post')
        }

        if(existingPost.orgId !== ctx.orgId) {
            throw forbidden('You can only update posts from your organization')
        }

        if (existingPost.status === 'PUBLISHED') {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Cannot update a published post',
            })
        }

        const { id, ...updateData} = input;

        const post = await ctx.prisma.post.update({
            where: { id },
            data: updateData,
        })


        ctx.req.log.info({postId: post.id}, `Post Updated`)
        

        return post
    }),


    delete: orgProcedure.input(deletePostSchema).mutation(async ({ctx, input}) => {
        const post = await ctx.prisma.post.findUnique({
            where: { id: input.id }
        })
        if (!post) {
            throw notFound('Post')
        }


        if (post.orgId !== ctx.orgId) {
            throw forbidden('You can only delete posts from your organization')
        }

        await ctx.prisma.post.delete({
            where: {id: input.id}
        })


        ctx.req.log.info({postId: input.id}, `Post deleted`)

        return { success: true }

    }),



    getById: orgProcedure.input(getPostSchema).query(async ({ ctx, input }) => {
        const post = await ctx.prisma.post.findUnique({
            where: {id: input.id},
        })

        if (!post) {
            throw notFound('Post')
        }


        if (post.orgId !== ctx.orgId) {
            throw forbidden('You can only view posts from your organization')
        }

        return post
    }),


    list: orgProcedure.input(listPostSchema).query(async ({ctx, input}) => {
        const { limit, cursor, status } = input;


        const posts = await ctx.prisma.post.findMany({
            where: {
                orgId: ctx.orgId,
                ...(status && { status}),
            },
            take: limit + 1,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                scheduledAt: 'asc',
                id: "asc"
            },
        })

        let nextCursor: string | undefined  = undefined


        if (posts.length > limit) {
            const nextItem = posts.pop()
            nextCursor = nextItem!.id
        }


        return {
            posts,
            nextCursor
        }
    }),


    analytics: orgProcedure.query(async ({ctx}) => {
        const stats = await ctx.prisma.post.groupBy({
            by: ['status'],
            where: {
                orgId: ctx.orgId,
            },
            _count: {
                _all: true
            },
            _sum: {
                views: true,
                likes: true,
                shares: true,
                comments: true
            },
        })

        return stats
    })


});

