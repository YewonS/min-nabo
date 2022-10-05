import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCircleCheck, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import useCoords from "@libs/client/useCoords";
import client from "@libs/server/client";

interface PostWithUser extends Post {
  user: User;
  _count: {
    votes: number;
    answers: number;
  }
}

interface PostsResponse {
  posts: PostWithUser[];
}

const Community: NextPage<PostsResponse> = ({ posts }) => {
  // const { latitude, longitude } = useCoords();
  // const { data, error } = useSWR<PostsResponse>(latitude && longitude ? `/api/posts?latitude=${latitude}&longitude=${longitude}` : null);

  return (
    <Layout hasTabBar title="Community News" seoTitle="Community">
      <div className="space-y-4 divide-y-[2px]">
        {posts?.map((post) => (
          // Each question
          <Link key={post.id} href={`/community/${post.id}`}>
            <a className="flex cursor-pointer flex-col pt-4 items-start">
              <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Question
              </span>
              <div className="mt-2 px-4 text-gray-700">
                <span className="text-orange-500 font-medium">Q. </span> 
                {post.question}
              </div>
              <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                <span>{post.user.name}</span>
                <span>{post.createdAt.toString()}</span>
              </div>
              <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t w-full">
                <span className="flex space-x-2 items-center text-sm">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
                  <span>Vote {post._count?.votes}</span>
                </span>
                <span className="flex space-x-2 items-center text-sm">
                  <FontAwesomeIcon icon={faCommentDots} className="w-4 h-4" />
                  <span>Answer {post._count?.answers}</span>
                </span>
              </div>
            </a>
          </Link>
        ))}
        {/* Write a new post */}
        <FloatingButton href="/community/write">
          <FontAwesomeIcon icon={faPencil} className="w-4 h-4" />
        </FloatingButton>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await client.post.findMany({
    include: { 
      user: true,
      _count: {
        select: {
            votes: true,
            answers: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 20, // every 20 seconds it will revalidate. Incremental Static Regeneration (ISR)
  };
}

export default Community;