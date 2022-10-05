import client from "@libs/server/client";
import handler, { ResponseType } from "@libs/server/handler";
import { NextApiRequest, NextApiResponse } from "next";
import { withAPISession } from "@libs/server/withSession";


async function tFAHandler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    const tokenExists = await client.token.findUnique({
        where: {
            payload: token,
        },
        include: { user: true },
    });
    if (!tokenExists) return res.status(400).end();
    req.session.user = {
        id: tokenExists.userId,
    }  
    await req.session.save();
    await client.token.deleteMany({
        where: {
            userId: tokenExists.userId,
        },
    }) 
    return res.status(200).json({ success: true });  
}

export default withAPISession(handler({ methods: ["POST"], handler: tFAHandler, isPrivate: false }));