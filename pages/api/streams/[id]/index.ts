import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
    if (id === undefined) return;
    const stream = await client.stream.findUnique({
        where: {
        id: +id.toString(),
        },
        include: {
          messages: {
            select: {
              id: true,
              message: true,
              user: {
                select: {
                  avatar: true,
                  id: true,
                },
              },
            },
          },
        },
    });
    res.json({ success: true, stream });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);