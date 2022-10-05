import { NextResponse, userAgent } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";


export function middleware(req: NextRequest, event: NextFetchEvent) {
    if (req.nextUrl.pathname.startsWith("/")) {
        const ua = userAgent(req);
        if (ua?.isBot) {
            return new Response("No bots allowed.", { status: 403 });
        }
    }

    if (req.nextUrl.pathname.startsWith("/api")) {
        if (!req.url.includes("/enter") && !req.cookies.get("appSession")) {
            NextResponse.redirect(`${req.nextUrl.origin}/enter`);
        }
    }

    // if (req.nextUrl.pathname.startsWith("/chats")) {
    //     console.log("chats only middleware");
    // }

    return NextResponse.next();
}