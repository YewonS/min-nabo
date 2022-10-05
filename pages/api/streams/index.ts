import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        query: { page },
        session: { user },
        body: { name, description },
    } = req;

    const take = 10;
    const skip = (+page! - 1) * 10;

    if (req.method === "POST") {
        const stream = await client.stream.create({
          data: {
              name,
              // price,
              description,
              user: {
              connect: {
                  id: user?.id,
              },
              },
          },
        });
        res.json({ success: true, stream });
        
    } else if (req.method === "GET") {
        // TODO: do pagination instead of loading all data
        const list = await client.stream.findMany({
          take, // this is how we do pagination with prisma :)
          skip, // take 20 after the first 10
        });
        res.json({ success: true, list });
    }
}

export default withAPISession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);