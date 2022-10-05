import client from "@libs/server/client";
import handler, { ResponseType } from "@libs/server/handler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function loginHandler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { phone, email } = req.body;
    const user = phone ? { phone } : email ? { email } : null;
    if (!user) return res.status(400).json({ success: false });
    const payload = Math.floor(100000 + Math.random() * 900000) + ""; // 6 digit random number
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: "Anonymous",
                        ...user,
                    },
                }
            }
        }
    });
    if (phone) {
        // const message = await twilioClient.messages.create({
        //     messagingServiceSid: process.env.TWILIO_MSID,
        //     to: `+45${phone}`,
        //     body: `Your login token is ${payload}. Please enter the token on the app.`
        // })
        
    } else if (email) {
        // const emailMessage = await mail.send({ 
        //     from: "yewon.yenny.seo@gmail.com",
        //     to: {email},
        //     subject: "MinNabo Verification",
        //     text: `Your login token is ${payload}. Please enter the token on the app.`,
        //     html: `<p>Your login token is <strong>${payload}</strong>. Please enter the token on the app.</p>`
        // })
        
    }
    
    return res.status(200).json({ success: true });
}

export default handler({ methods: ["POST"], handler: loginHandler, isPrivate: false });