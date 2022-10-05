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
        session: {user},
    } = req;
    if (id === undefined) return;

    const alreadyExists = await client.vote.findFirst({
        where: {
            userId: user?.id,
            postId: +id.toString(),
        },
        select: {
            id: true,
        }
    })
    if (alreadyExists) {
        await client.vote.delete({
            where: {
                id: alreadyExists.id
            }
        })
    } else {
        await client.vote.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    }
                },
                post: {
                    connect: {
                        id: +id.toString()
                    }
                }
            }
        })
    }

    res.json({
        success: true,
    });
}

// TODO: handle 404 not found on every api handler

export default withAPISession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);