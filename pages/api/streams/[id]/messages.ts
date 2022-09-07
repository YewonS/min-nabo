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
        body,
        session: { user },
    } = req;

    if (id === undefined) return;
    const message = await client.message.create({
        data: {
        message: body.message,
        stream: {
            connect: {
            id: +id.toString(),
            },
        },
        user: {
            connect: {
            id: user?.id,
            },
        },
        },
    });

    res.json({ success: true, message });
}

export default withAPISession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);