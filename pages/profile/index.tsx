import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Profile: NextPage = () => {
  return (
    <Layout hasTabBar title="Profile">
      <div className="px-4">
          {/* Profile */}
        <div className="flex items-center mt-4 space-x-3">
          <div className="w-16 h-16 bg-slate-500 rounded-full" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">Steve Jebs</span>
            <Link href="/profile/edit">
              <a className="text-sm text-gray-700">Edit profile &rarr;</a>
            </Link>
          </div>
        </div>
        {/* Items options */}
        <div className="mt-10 flex justify-around">
          
          <Link href="/profile/sold">
            <a className="flex flex-col items-center">
              <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                {/* cart icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">
                Sold
              </span>
            </a>
          </Link>

          <Link href="/profile/bought">
            <a className="flex flex-col items-center">
              <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                {/* shopping bag icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">
                Bought
              </span>
            </a>
          </Link>

          <Link href="/profile/loved">
            <a className="flex flex-col items-center">
              <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
                {/* heart icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700">
                My Favorites
              </span>
            </a>
          </Link>
        </div>

      {/* Review */}
        <div className="mt-12">
          <div className="flex space-x-4 items-center">
            <div className="w-12 h-12 rounded-full bg-slate-500" />
            <div>
              <h4 className="text-sm font-bold text-gray-800">Niko</h4>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 h-5 w-5" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 h-5 w-5" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 h-5 w-5" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 h-5 w-5" />
                <FontAwesomeIcon icon={faStar} className="text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;