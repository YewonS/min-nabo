import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone, } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { joinClassNames } from "@libs/client/utils";
import Button from "@components/button";
import Input from "@components/input";
import useValidation from "@libs/client/useValidation";
import { useRouter } from "next/router";

interface LoginForm {
  email?: string;
  phone?: string;
}

interface ValidationResult {
  success: boolean;
}

interface TokenForm {
  token: string;
}

export default function Enter() {
  const [ login, { loading, data, error } ] = useValidation<ValidationResult>("/api/users/login");
  const [ confirmToken, { loading: tokenLoading, data: tokenData } ] = useValidation<ValidationResult>("/api/users/confirm");
  const { register, watch, reset, handleSubmit } = useForm<LoginForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } = useForm<TokenForm>();

  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => { 
    reset();
    setMethod("email"); 
  }
  const onPhoneClick = () => { 
    reset();
    setMethod("phone"); 
  }
  const onValid = (formData: LoginForm) => {
    if (loading) return;
    login(formData);
  }
  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  }
  
  const router = useRouter();
  useEffect(() => {
    if (tokenData?.success) {
      router.push("/"); 
    }
  }, [tokenData, router]);

  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-center">Login</h3>
      <div className="mt-12">

        {data?.success ? 
        // 2FA
          <form onSubmit={ tokenHandleSubmit(onTokenValid) } className="flex flex-col mt-8 space-y-4 px-4">
            <Input 
              register={tokenRegister("token")}
              name="token" 
              label="Confirm Token" 
              type="number" 
              required
            />
            <Button text={tokenLoading ? "Loading" : "Confirm Token"} />         
        </form>
       : ( 
        // Initial Login 
          <>
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
            <form onSubmit={ handleSubmit(onValid) } className="flex flex-col mt-8 space-y-4 px-4">
              {method === "email" ? (
                <Input 
                  register={register("email")}
                  name="email" 
                  label="Email address" 
                  type="email" 
                  required
                />
              ) : null}
              {method === "phone" ? (
                <Input
                  register={register("phone")}
                  name="phone"
                  label="Phone number"
                  type="number"
                  kind="phone"
                  required
                />
              ) : null}
              {method === "email" ? (
                    <Button text={loading ? "Loading" : "Get login link"} />
              ) : null}
              {method === "phone" ? (
                <Button text={loading ? "Loading" : "Get one-time password"} />
              ) : null}
            </form>
          </> 
        )}

        
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