import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        query: {id},
        session: {user}
    } = req;
    if (id === undefined) return;

    const post = await client.post.findUnique({
        where: {
            id: +id.toString(),
        }, 
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            }
          },
          // TODO: maybe take this outside post to do pagination. And bring like first 10 comments or sth first.
          answers: {
            select: {
              answer: true,
              id: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                }
              }
            },
            take: 10,
            skip: 20,
          },
          _count: {
            select: {
              answers: true,
              votes: true,
            }
          }
        }
    })

    const hasVoted = Boolean(await client.vote.findFirst({
      where: {
        postId: +id.toString(),
        userId: user?.id
      },
      select: {
        id: true
      }
    }))

    res.json({
        success: true,
        post,
        hasVoted
    });
}

// TODO: handle 404 not found on every api handler

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);