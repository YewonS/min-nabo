import type { NextPage } from "next";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCircleCheck, faCommentDots } from "@fortawesome/free-regular-svg-icons";

const CommunityPostDetail: NextPage = () => {
  return (
      <Layout canGoBack>
        <div>
          <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Question
          </span>
          {/* Profile */}
          <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">Steve Jebs</p>
              <p className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </p>
            </div>
          </div>
          <div>
            {/* Question */}
            <div className="mt-2 px-4 text-gray-700">
              <span className="text-orange-500 font-medium">Q.</span> 
              What is the best mandu restaurant?
            </div>
            <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
              <span className="flex space-x-2 items-center text-sm">
                <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
                <span>Question 1</span>
              </span>
              <span className="flex space-x-2 items-center text-sm">
                <FontAwesomeIcon icon={faCommentDots} className="w-4 h-4" />
                <span>Answer 1</span>
              </span>
            </div>
          </div>
          {/* Answer */}
          <div className="px-4 my-5 space-y-5">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  Steve Jebs
                </span>
                <span className="text-xs text-gray-500 block ">2hrs ago</span>
                <p className="text-gray-700 mt-2">
                  The best mandu restaurant is the one next to my house.
                </p>
              </div>
            </div>
          </div>
          {/* Reply */}
          <div className="px-4">
            <TextArea
              name="description"
              placeholder="Answer this question!"
              required
            />
            <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
              Reply
            </button>
          </div>
        </div>
      </Layout>
  );
};

export default CommunityPostDetail;