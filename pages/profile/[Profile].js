import React, { useEffect, useState } from "react";
import { getProfile, changeProfile } from "../../components/apiservice";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
function Profile({ profileState,setProfileState }) {
  const router = useRouter();

  const [email, setEmail] = useState();

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    birthDate: "",
    phone: "",
  });
  const [password, setPassword] = useState("");
  const [loading, setLoaderState] = useState(false);
  const [loader, setLoader] = useState(false);
  const saveChanges = () => {
    const token = cookie.get("token");
    if (token) {
      changeProfile(
        token,
        setLoaderState,
        router,
        setEmail,
        setAdminInfo,
        adminInfo,
        password,
        setProfileState,
        profileState

      );
    } else {
      router.push("/login-page");
    }
  };
  useEffect(() => {
    const token = cookie.get("token");

    if (token) {
      getProfile(token, setLoader, router, setEmail, setAdminInfo, adminInfo);
    } else {
      router.push("/login-page");
    }
  }, []);

  return (
    <>
      <div className="main-content-box" data-testid="profilePage">
        <div className="flex-text text-left text-gray-700 text-xl mb-4">
          <span>Profile</span>
        </div>
        <hr className="mt-6 mb-6" />
        {loader === true ? (
          <div className="loader-box">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}
        <div className="container mx-auto">
          <div className="flex-container flex-wrap justify-between grid gap-1 mb-5">
            <div className="wd-50">
              <div className="bg-white sm:rounded-lg p-4 py-2 shadow-lg">
                <h2 className="mb-4 mt-2">Profile Information</h2>
                <hr className="mb-3" />

                <div className=" f-12">
                  <p className="form-label block font-semibold mb-2">Email</p>

                  <div className="">
                    <p className="form-label block">
                      <input
                        type="email"
                        name="email"
                        className="  block
                        w-full
                        p-2
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none f-12"
                        disabled
                        value={email}
                      />
                    </p>
                  </div>
                </div>
                <div className=" f-12">
                  <p className="form-label block font-semibold mb-2">Name</p>

                  <div className="">
                    <p className="form-label block">
                      <input
                        type="text"
                        name="name"
                        value={adminInfo?.name}
                        className="  block
                        w-full
                        p-2
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none f-12"
                        onChange={(e) => {
                          setAdminInfo({
                            ...adminInfo,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="f-12">
                  <p className="form-label block font-semibold mb-2">
                    Phone Number
                  </p>

                  <div className="">
                    <p className="form-label block">
                      <input
                        type="text"
                        name="phone"
                        value={adminInfo?.phone}
                        className="  block
                        w-full
                        p-2
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none f-12"
                        onChange={(e) => {
                          setAdminInfo({
                            ...adminInfo,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="f-12">
                  <p className="form-label block font-semibold mb-2">
                    Birth Data
                  </p>

                  <div className="">
                    <p className="form-label block">
                      <input
                        type="date"
                        name="birthDate"
                        value={adminInfo?.birthDate}
                        className="  block
                        w-full
                        p-2
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none f-12"
                        onChange={(e) => {
                          setAdminInfo({
                            ...adminInfo,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className=" f-12">
                  <p className="form-label block font-semibold mb-2">
                    New Password
                  </p>

                  <div className="">
                    <p className="form-label block">
                      <input
                        type="password"
                        name="old_password"
                        className="  block
                        w-full
                        p-2
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none f-12"
                        placeholder="New Password"
                        autoComplete="new-password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </p>
                  </div>
                </div>
                <div className="text-right mt-12">
                  <button
                    data-testid="result"
                    type="button"
                    className="flex justify-end p-3 ml-auto primary-bg text-white text-xs leading-tight rounded shadow-md
                          hover:primary-bg hover:shadow-lg
                          focus:primary-bg focus:shadow-lg focus:outline-none focus:ring-0
                          active:primary-bg active:shadow-lg
                          transition
                          duration-150
                          ease-in-out font-large"
                    onClick={() => {
                      saveChanges();
                    }}
                  >
                    {loading && <div className="loader loader-img mr-2"></div>}
                    <span className="pr-2">Save Changes</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
