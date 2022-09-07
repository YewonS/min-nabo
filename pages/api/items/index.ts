import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    if(req.method === "GET") {
        const items = await client.item.findMany({
            include: {
                _count: {
                    select: {
                        favs: true,
                    }
                }
            }
        });
        res.json({
            success: true,
            items
        })
    }
    if(req.method === "POST") {
        const {
            body: {name, price, description, photoId},
            session: {user},
        } = req;
        const item = await client.item.create({
            data: {
                name, 
                price: parseFloat(price), 
                description,
                imageURL: photoId,
                user: {
                    connect: {
                        id: user?.id,
                    }
                }
            }
        })
    
        res.json({
            success: true,
            item,
        });
    }    
}

export default withAPISession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);