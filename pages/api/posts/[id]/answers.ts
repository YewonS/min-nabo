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
        body: {answer}
    } = req;
    if (id === undefined) return;

    const post = await client.post.findUnique({
        where: {
            id: +id.toString(),
        }, 
        select: {
            id: true,
        }
    })
    if (!post) return res.status(404);

    const newAnswer = await client.answer.create({
        data: {
            user: {
                connect: {
                    id: user?.id,
                }
            },
            post: {
                connect: {
                    id: +id.toString()
                }
            },
            answer,
        }
    })

    console.log('newAnswer', newAnswer)

    res.json({
        success: true,
        answer: newAnswer,
    });
}

// TODO: handle 404 not found on every api handler

export default withAPISession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);