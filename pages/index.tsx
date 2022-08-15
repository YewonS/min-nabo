import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular, faCommentDots } from "@fortawesome/free-regular-svg-icons";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-5 py-10">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        // products
        <div key={i} className="flex px-4 border-b pb-4 cursor-pointer justify-between">
          <div className="flex space-x-4">
            {/* image */}
            <div className="w-20 h-20 bg-gray-200 rounded-md" />
            {/* Title, description, and price */}
            <div className="pt-2 flex flex-col">
              <h3 className="text-lg font-medium text-gray-900">New iPhone 14</h3>
              <span className="text-sm text-gray-500">Black</span>
              <span className="font-medium mt-1 text-gray-900">$95</span>
            </div>
          </div>
          {/* Like, Comment buttons */}
          <div className="flex items-end justify-end space-x-2.5">
            <div className="flex items-center text-sm text-gray-600 space-x-0.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <FontAwesomeIcon icon={faHeartRegular} />
              </svg>
              <span>1</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 space-x-0.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <FontAwesomeIcon icon={faCommentDots} />
              </svg>
              <span>1</span>
            </div>
          </div>
        </div>
      ))}
      {/* Add button */}
      <button className="fixed bottom-24 right-5 bg-orange-400 rounded-full p-4 text-white shadow-xl
                      hover:bg-orange-600 cursor-pointer transition-colors">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={faPlus} />
        </svg>
      </button>
    </div>
  );
}

export default Home;
