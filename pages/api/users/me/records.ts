import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";
import { RecordKind } from "@prisma/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
    const {
        session: { user },
        query: { kind },
    } = req;

    const kindStr = kind!.toString();
    const records = await client.record.findMany({
        where: {
        userId: user?.id,
        kind: kindStr as RecordKind,
        },
    });

    res.json({
        success: true,
        [kindStr]: records,
    });
};
// TODO: implement this to avoid redundancy...
export default withAPISession(
    withHandler({
      methods: ["GET"],
      handler,
    })
);