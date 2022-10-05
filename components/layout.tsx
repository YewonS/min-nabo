import React from "react";
import Link from "next/link";
import { joinClassNames } from "@libs/client/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faHouse, faNewspaper, faCommentDots, faVideo, faUser, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";

interface LayoutProps {
    title?: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode; 
    seoTitle?: string;
}

export default function Layout({ title, canGoBack, hasTabBar, children, seoTitle} : LayoutProps) {
    const router = useRouter();
    const onClickGoBack = () => {
        router.back();
    }
    return (
        <div>
            <Head>
                <title>{seoTitle ? `${seoTitle} | Min Nabo` : "Min Nabo"}</title>
            </Head>
            {/* Title */}
            <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
                {canGoBack ? <button onClick={onClickGoBack} className="absolute left-4"><FontAwesomeIcon icon={faChevronLeft} /></button> : null}
                {title ? (<span className={joinClassNames(canGoBack ? "mx-auto" : "", "")}>{title}</span>) : null}
            </div>
            {/* Page elements */}
            <div className={joinClassNames("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>
            {/* Nav bar */}
            {hasTabBar ? ( 
                <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
                    <Link href="/">
                        <a className={joinClassNames(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}>
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Home</span>
                        </a>
                    </Link>
                    <Link href="/community">
                        <a className={joinClassNames(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/community"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}>
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>Community</span>
                        </a>
                    </Link>
                    <Link href="/chats">
                        <a className={joinClassNames(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/chats"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}>
                            <FontAwesomeIcon icon={faCommentDots} />
                            <span>Chats</span>
                        </a>
                    </Link>
                    <Link href="/streams">
                        <a className={joinClassNames(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/streams"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}>
                            <FontAwesomeIcon icon={faVideo} />
                            <span>Live</span>
                        </a>    
                    </Link>
                    <Link href="/profile">
                        <a className={joinClassNames(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/profile"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Profile</span>
                        </a>
                    </Link>
                </nav>
            ) : null}
        </div>
    );
}