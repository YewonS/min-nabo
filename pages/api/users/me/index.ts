import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/handler";
import client from "@libs/server/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    if (req.method === "GET") {
      const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
      });
      return res.json({
        success: true,
        profile,
      });
    }

    if (req.method === "POST") {
      const {
        session: {user},
        body: {email, phone, name, avatarId}
      } = req;

      const currentUser = await client.user.findUnique({
        where: {
          id: user?.id,
        }
      });

      if(email && email !== currentUser?.email) {
        const alreadyExists = Boolean(await client.user.findUnique({
          where: { 
            email,
          },
          select: {
            id: true,
          }
        }));
        if (alreadyExists) {
          return res.json({
            success: false,
            error: "Email already taken."
          })
        } else {
          await client.user.update({
            where: {
              id: user?.id,
            },
            data: {
              email,
            }
          });
        }
      } 
      
      if (phone && phone !== currentUser?.phone) {
        const alreadyExists = Boolean(await client.user.findUnique({
          where: { 
            phone,
          },
          select: {
            id: true,
          }
        }));
        if (alreadyExists) {
          return res.json({
            success: false,
            error: "Phone number already in use."
          })
        } else {
          await client.user.update({
            where: {
              id: user?.id,
            },
            data: {
              phone,
            }
          });
        }
      }

      if (name) {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            name,
          }
        })
      }

      if (avatarId) {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            avatar: avatarId,
          }
        })
      }

      // nothing happened. user put the same email and/or phone
      return res.json({
        success: true,
      });
    }
}

export default withAPISession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);