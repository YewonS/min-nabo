import { NextRequest, NextFetchEvent, userAgent, NextResponse } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
    const { isBot } = userAgent(req);
    if (isBot) {
        return new Response("No bots allowed", { status: 403 });
    }
    if (!req.url.includes("/api")) {
        if (!req.url.includes("/enter") && !req.cookies.get("appSession")) {
            return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
        }
    }
    return NextResponse.json({ success: true});
}

// if (request.nextUrl.pathname.startsWith('/about')) {
//     // This logic is only applied to /about
//   }