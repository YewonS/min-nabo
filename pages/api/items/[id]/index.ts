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
        session: { user } 
    } = req;
    if (id === undefined) return;
    const cleanID = +id.toString();
    const item = await client.item.findUnique({
        where: {
            id: cleanID,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            },
        }
    })
    const terms = item?.name.split(" ").map((word)=>({ 
        name: {
            contains: word,
        }
    }));
    const relatedItems = await client.item.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: item?.id,
                }
            }
        }
    })
    const isLiked = Boolean(
        await client.favorite.findFirst({
            where: {
                itemId: item?.id,
                userId: user?.id
            },
            select: {
                id: true
            }
        })
    )
    
    res.json({ success: true, item, relatedItems, isLiked });
}

export default withAPISession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);