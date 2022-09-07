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
        session: { user },
     } = req;
    if (id === undefined) return;

    const alreadyExist = await client.favorite.findFirst({
        where: {
            itemId: +id.toString(),
            userId: user?.id
        }
    });

    if (alreadyExist) {
        // undo like
        await client.favorite.delete({
            where: {
                id: alreadyExist.id
            }
        })
    } else {
        // create like
         await client.favorite.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    }
                },
                item: {
                    connect: {
                        id: +id.toString()
                    }
                }
            }
         })

    }
    
    res.json({ success: true, });
}

export default withAPISession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);