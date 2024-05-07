import React from "react";
import { useState, useEffect, Fragment } from "react";

import Image from "next/image";
import loginimg from "../../public/new-trip-logo.png";
import loginTopImg from "../../public/unsplash.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { loginFunction } from "../../components/apiservice";
const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email must be required"),
  password: yup.string().min(6).required("Password must be required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [access_token, setAcces_token] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("login");
  const [userName, setUserName] = useState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  const loginSubmit = () => {
    loginFunction(emailAddress, password, setIsLoading, router);
  };
  return (
    <>
      <section className="h-screen login-screen">
        <div className=" h-full text-gray-800">
          <div className="mobile-view flex lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="ht-100 mob-hide grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <div className="login-top-img">
                {/* <Image
                  unoptimized
                  src={loginTopImg}
                  className=""
                  alt="login img"
                /> */}
              </div>
              <Image
                unoptimized
                src={loginimg}
                className="login-img w-full"
                alt="login img"
              />
            </div>
            <div className="mob-wd-100 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form
                className="login-btn-form"
                onSubmit={handleSubmit(loginSubmit)}
              >
                <h1 className="heading">Login</h1>
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                  <div className="form-group mb-6">
                    <label className="form-label inline-block mb-2 text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      {...register("email", {
                        onChange: (e) => setEmailAddress(e.target.value),
                      })}
                      className="form-control
                      block
                      w-full
                      p-3
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors?.email?.message}
                    </span>
                  </div>

                  <div className="form-group mb-6">
                    <label className="form-label inline-block mb-2 text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      {...register("password", {
                        onChange: (e) => setPassword(e.target.value),
                      })}
                      className="form-control block
                        w-full
                        p-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                    />
                    <span style={{ color: "red" }}>
                      {" "}
                      {errors?.password?.message}
                    </span>
                  </div>

                  <button
                    data-testid="result"
                    type="submit"
                    className=" w-full flex justify-center
                    p-5
                    text-white
                    font-medium
                    login-btn-bg
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out font-large"
                                    >
                    <span className="pr-2" type="submit">
                      Submit
                    </span>
                    {isLoading && <div className="loader loader-img"></div>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
