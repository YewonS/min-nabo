import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { Stream } from "@prisma/client";
import useSWR from "swr";
import usePage from "@components/scrollPage";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Streams: NextPage = () => {
  // TODO: pagination on frontend: /api/streams?page=3 -> 
  // and then in the backend, you can set the pageSize and set the take and skip values to do pagination
  // backendPage = frontendPage -1; pageSize = 20; take: 20; skip: backendPage * 20;
  const page = usePage(`/api/streams`);
  // const { data } = useSWR<StreamsResponse>(`/api/streams`);
  return (
    <Layout hasTabBar title="Live Stream">
      <div className="divide-y-[1px] space-y-4">
        {page?.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a className="pt-4 block  px-4">
              <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                {stream.name}
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

export default Streams;