import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { session: {user} } = req;

  const reviews = await client.review.findMany({
    where: {
        createdForId: user?.id,
    },
    include: {
        createdBy: {
            select: {
                id: true,
                name: true,
                avatar: true,
            }
        }
    }
  });

  res.json({
    success: true,
    reviews,
  });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);