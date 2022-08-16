import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone, } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { joinClassNames } from "../libs/utils";
import Button from "../components/button";
import Input from "../components/input";


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
        <form className="flex flex-col mt-8 space-y-4 px-4">
          {method === "email" ? (
            <Input name="email" label="Email address" type="email" required />
          ) : null}
          {method === "phone" ? (
            <Input
              name="phone"
              label="Phone number"
              type="number"
              kind="phone"
              required
            />
          ) : null}
          {method === "email" ? <Button text={"Get login link"} /> : null}
          {method === "phone" ? (
            <Button text={"Get one-time password"} />
          ) : null}
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