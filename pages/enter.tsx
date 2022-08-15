import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone, } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

function joinClassNames(...classnames: string[]) {
  return classnames.join(" ");
}

export default function Enter() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => setMethod("email");
  const onPhoneClick = () => setMethod("phone");
  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-center">Login</h3>
      <div className="mt-8">
        <div className="flex flex-col items-center">
          {/* Login method options */}
          <h5 className="text-sm text-gray-500 font-medium">Login using:</h5>
          <div className="grid grid-cols-2 gap-16 border-b mt-8 w-full mb-4">
            <button 
              className={joinClassNames("pb-4 font-medium border-b-2", method === "email" ? "text-orange-500 border-orange-500" : "border-transparent text-gray-500")}
              onClick={onEmailClick}
            > 
              Email <FontAwesomeIcon icon={faAt}  />
            </button>
            <button 
              className={joinClassNames("pb-4 font-medium border-b-2", method === "phone" ? "text-orange-500 border-orange-500" : "border-transparent text-gray-500")}
              onClick={onPhoneClick}
            >
              Phone <FontAwesomeIcon icon={faPhone} />
            </button>
          </div>
        </div>
        {/* Login form */}
        <form className="flex flex-col mt-8 px-4">
          <label className="text-sm font-medium text-gray-700">
            {method === "email" ? "Email address" : null}
            {method === "phone" ? "Phone number" : null}
          </label>
          <div className="mt-1">
            {method === "email" ? 
              <input 
                type="email" 
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                          focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                required 
              /> : null}
            {method === "phone" ? (
              <div className="flex rounded-md shadow-sm">
                <span 
                  className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm"
                >+45</span>
                <input type="tel" pattern="[0-9]{8}" 
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-orange-500 focus:border-orange-500" 
                required />
              </div>
            ) : null}
          </div>
          <button 
            className="mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                      focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
            {method === "email" ? "Get login link" : null}
            {method === "phone" ? "Get one-time password" : null}
          </button>
        </form>
        {/* Social Network Login options */}
        <div className="mt-8 px-4">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center">
              <span className="bg-white px-2 text-sm text-gray-500">Or enter with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button 
              className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 
                      hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <FontAwesomeIcon icon={faGoogle} />
              </svg>
            </button>
            <button
              className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 
                      hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <FontAwesomeIcon icon={faGithub} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}