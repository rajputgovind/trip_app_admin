import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";

import axios from "axios";
import { toast } from "react-toastify";
import cookie from "js-cookie";

import { useRouter } from "next/router";

export default function Layout({ children }) {

  const [showNav, setShowNav] = useState(true);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const [loginState, setLoginState] = useState("login");
  const [userName, setUserName] = useState();

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

  return (
    <>
      <div>
        <div className="dashboard-content">
          <TopBar showNav={showNav} setShowNav={setShowNav} profileState={children?.props?.profileState}  />
          <Transition
            as={Fragment}
            show={showNav}
            enter="transform transition duration-[400ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform duration-[400ms] transition ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <SideBar showNav={showNav} />
          </Transition>
          <main
            className={`pt-16 transition-all duration-[400ms] ${
              showNav && !isMobile ? "pl-56" : ""
            }`}
          >
            <div className=" p-5">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
