import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        }
    }
}

const cookieOptions = {
    cookieName: "appSession",
    password: process.env.COOKIE_PSWD!,
}

export function withAPISession(fn: any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSSRSession(fn: any) {
    return withIronSessionSsr(fn, cookieOptions);
}