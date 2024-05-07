import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
  ArrowRightRectangle,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import blankuser from "../public/blank-user.png";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import mansmiling from "../public/man-smiling.jpg";
import logo from "../public/new-trip-logo.png";
import { getProfile } from "./apiservice";
import { MdEmail } from "react-icons/md";

export default function TopBar({ showNav, setShowNav,profileState }) {
  const router = useRouter();
  const logoutFunction = () => {
    cookie.remove("token");
    router.push("/login-page");
  };
 
  const [userName, setUserName] = useState('');
  const [isLoading, setLoaderState] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const token = cookie.get("token");
   
      getProfile(
        token,
        setLoaderState,
        router,
        setEmail,
        setUserName,
        userName
        // (userName) => setUserName(userName)
      );
  
  }, [profileState,router.pathname]);

  return (
    <div
      className={`top-bar fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "" : ""
      }`}
    >
      <div className="logo-box  pl-4 ">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-[#fff] cursor-pointer"
          onClick={() => {
            setShowNav(!showNav);
          }}
        />

        <picture
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            className=" logo h-auto"
            src={logo}
            alt="company logo"
            width="100"
            height="100"
          />
        </picture>
      </div>
      <div className="flex items-center pr-4">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <div className="">
                <div className="font-medium adminname--box text-white">
                  <p> {userName?.name}</p>
                  <ChevronDownIcon className=" ml-2 h-4 w-4 text-white" />
                </div>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right drop--menu rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    href="/profile"
                    className="flex drop--menu-text hover:text-white  text-primary rounded p-2 text-sm group transition-colors items-center"
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <>
                    <button
                      type="button"
                      className="flex w-full drop--menu-text hover:text-white text-primary rounded p-2 text-sm group transition-colors items-center"
                      onClick={() => {
                        logoutFunction();
                      }}
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2" />
                      Logout
                    </button>
                  </>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {isLoading === true ? (
        <div className="loader-box">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
