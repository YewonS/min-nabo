import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {session: {user}} = req;

    const favorites = await client.favorite.findMany({
        where: {
            userId: user?.id,
        },
        include: {
            item: {
              include: {
                _count: {
                    select: {
                        favs: true,
                    }
                }
              }
            },
        }
    })
    res.json({
        success: true,
        favorites,
    });
}

// TODO: refactor and make it to record to avoid redundancy...
export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);