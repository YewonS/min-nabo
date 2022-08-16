import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import FloatingButton from "../../components/floatingBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCircleCheck, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Community: NextPage = () => {
  return (
    <Layout hasTabBar title="Community News">
      <div className="space-y-4 divide-y-[2px]">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          // Each question
          <Link key={i} href={`/community/${i}`}>
            <a className="flex cursor-pointer flex-col pt-4 items-start">
              <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Question
              </span>
              <div className="mt-2 px-4 text-gray-700">
                <span className="text-orange-500 font-medium">Q.</span> 
                What is the best mandu restaurant?
              </div>
              <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                <span>Niko</span>
                <span>18hrs ago</span>
              </div>
              <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t w-full">
                <span className="flex space-x-2 items-center text-sm">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
                  <span>Question 1</span>
                </span>
                <span className="flex space-x-2 items-center text-sm">
                  <FontAwesomeIcon icon={faCommentDots} className="w-4 h-4" />
                  <span>Answer 1</span>
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

export default Community;