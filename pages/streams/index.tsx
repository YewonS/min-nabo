import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import FloatingButton from "../../components/floatingBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const Live: NextPage = () => {
  return (
    <Layout hasTabBar title="Live Stream">
      <div className="divide-y-[1px] space-y-4">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Link key={i} href={`/streams/${i}`}>
            <a className="pt-4 block  px-4">
              <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                Galaxy S50
              </h1>
            </a>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <FontAwesomeIcon icon={faVideo} className="w-6 h-6" />
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Live;