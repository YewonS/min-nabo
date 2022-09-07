import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        body: {question, latitude, longitude},
        session: {user},
    } = req;

    if (req.method === "POST") {
        const post = await client.post.create({
            data: {
                question,
                latitude,
                longitude,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })

        res.json({
            success: true,
            post
        });
    }

    if (req.method === "GET") {
        const { query: {latitude, longitude} } = req; 
        const latFloat = parseFloat(latitude!.toString());
        const lonFloat = parseFloat(longitude!.toString());
        // TODO: do pagination here.
        // TODO: let users set the location boundary
        const posts = await client.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    }
                },
                _count: {
                    select: {
                        votes: true,
                        answers: true,
                    }
                }
            },
            where: {
                latitude: {
                    gte: latFloat - 0.01,
                    lte: latFloat + 0.01,
                },
                longitude: {
                    gte: lonFloat - 0.01,
                    lte: lonFloat + 0.01,
                }
            }
        });
        res.json({
            success: true,
            posts
        })
    }

}

export default withAPISession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);