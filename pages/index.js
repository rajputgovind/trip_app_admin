import { useState, useEffect } from "react";
import {  getProfile } from "../components/apiservice";
import { useRouter } from "next/router";
import Head from "next/head";
import loginimg from "../public/new-trip-logo.png";
import cookie from "js-cookie";
import axios from "axios";
export default function Home(data) {
  const router = useRouter();
  const [isLoading, setLoaderState] = useState(false);
  const [email, setEmail] = useState();
  const [adminInfo, setAdminInfo] = useState({});

  useEffect(() => {
    const token = cookie.get("token");
    if (token) {
      getProfile(
        token,
        setLoaderState,
        router,
        setEmail,
        setAdminInfo,
        adminInfo
      );
    } else {
      router.push("/login-page");
    }
  }, [router.pathname]);
  useEffect(() => {
    if (
      data?.data === "token not found" ||
      data?.data?.message === "unAuthorized"
    ) {
      router.push("/login-page");
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/mainfavicon.png" />
      </Head>{" "}
      <div className="main-content-box" data-testid="result">
        <p className="flex-text text-left heading text-xl mb-4">
          {isLoading === true ? (
            <div className="loader-box">
              <div className="loader"></div>
            </div>
          ) : (
            ""
          )}
          <span>
            Welcome!&nbsp;
            <span className="font-semibold">{adminInfo?.name}</span>
          </span>
        </p>
        <hr className="mt-6 mb-6" />
        <div className="row mt-4 justify-content-between">
          <div className="col-7">
            <div className="home-card">
              <p className="primary-text font-semibold mb-1.5">
                {data?.data?.users}
              </p>
              <p className="text-gray-400 f-14">Total Users</p>
            </div>
          </div>
          <div className="col-7">
            <div className="home-card">
              <p className="primary-text font-semibold mb-1.5">
                {" "}
                {data?.data?.organizers}
              </p>
              <p className="text-gray-400 f-14">Total Organizers</p>
            </div>
          </div>
          <div className="col-7">
            <div className="home-card">
              <p className="primary-text font-semibold mb-1.5">
                {" "}
                {data?.data?.trips}
              </p>
              <p className="text-gray-400 f-14">Total Trips</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req, res } = context;

    if (req.cookies.token) {
      let usersCount = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/count`,
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );
      let countData = await usersCount.json();

      return {
        props: {
          data: countData,
        },
      };
    } else {
      return {
        props: {
          data: "token not found",
        },
      };
    }
  } catch (err) {
    return {
      props: {
        data: "",
      },
    };
  }
}
