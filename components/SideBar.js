import { forwardRef, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { VscFeedback } from "react-icons/vsc";

import Image from "next/image";
import FAQData from "../public/faqs.svg";
import {
  MdAttachMoney,
  MdOutlineProductionQuantityLimits,
  MdOutlineReviews,
} from "react-icons/md";

import { RiCoupon3Line } from "react-icons/ri";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { useRouter } from "next/router";
import { FaUsers } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import { MdManageAccounts } from "react-icons/md";
import { SiYourtraveldottv } from "react-icons/si";

import cookie from "js-cookie";

import {
  AiOutlineHome,
  AiOutlineDollarCircle,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineProject,
  AiOutlineUnorderedList,
} from "react-icons/ai";

import { BiUserPin } from "react-icons/bi";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [userType, setUserType] = useState();
  const [settingDropdown, setsettingDropdown] = useState(false);
  const routerSettings = () => {
    router.push("/setting");
    setsettingDropdown(!settingDropdown);
  };
  return (
    <div className="sidebar-box">
      <div ref={ref} className="sidebar fixed w-58 h-full bg-white ">
        <div className="flex flex-col ">
          <Link href="/">
            <div
              className={`side-menu cursor-pointer ${
                router.pathname == "/"
                  ? " active-menu light-blue"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineHome />
              </div>
              <div className="menu-text">
                <p>Dashboard</p>
              </div>
            </div>
          </Link>

          <Link href="/users">
            <div
              className={`side-menu  ${
                router.pathname == "/users"
                  ? "active-menu light-blue"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineUser />
              </div>
              <div>
                <p>Users Management</p>
              </div>
            </div>
          </Link>
          <Link href="/organizer">
            <div
              className={`side-menu  ${
                router.pathname == "/organizer" ||
                router.pathname == "/products"
                  ? "active-menu light-blue"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <MdManageAccounts />
              </div>
              <div>
                <p>Organizer Management</p>
              </div>
            </div>
          </Link>
          <Link href="/tripCreators">
            <div
              className={`side-menu  ${
                router.pathname == "/tripCreators"
                  ? "active-menu light-blue"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <SiYourtraveldottv/>
              </div>
              <div>
                <p>Trips</p>
              </div>
            </div>
          </Link>

          {/* <Link href="/testimonials">
            <div
              className={`side-menu  ${
                router.pathname == "/testimonials"
                  ? "active-menu light-blue"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <VscFeedback />
              </div>
              <div>
                <p>Testimonials</p>
              </div>
            </div>
          </Link> */}

          <button
            className=""
            type="button"
            onClick={() => {
              routerSettings();
            }}
          >
            <div
              className={`side-menu  ${
                router.pathname === "/setting"
                  ? "active-menu light-blue"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineSetting />
              </div>
              <div>
                <p>Settings</p>
              </div>
            </div>
          </button>

          {settingDropdown === true && (
            <div
              className={
                settingDropdown === true
                  ? "setting-dropdown flex flex-col pt-2 ml-[20px]"
                  : ""
              }
            >
              <Link href="/privacy-policy">
                <div
                  className={`side-menu  ${
                    router.pathname == "/privacy-policy"
                      ? "active-menu light-blue"
                      : "text-white deactive-menu"
                  }`}
                >
                  <div className="menu-icon">
                    <IoShieldCheckmarkOutline />
                  </div>
                  <div>
                    <p>Privacy Policy</p>
                  </div>
                </div>
              </Link>
              <Link href="/terms-conditions">
                <div
                  className={`side-menu  ${
                    router.pathname == "/terms-conditions"
                      ? "active-menu light-blue"
                      : "text-white deactive-menu"
                  }`}
                >
                  <div className="menu-icon">
                    <LuClipboardCheck />
                  </div>
                  <div>
                    <p>Terms and conditions</p>
                  </div>
                </div>
              </Link>
              <Link href="/about-us">
                <div
                  className={`side-menu  ${
                    router.pathname == "/about-us"
                      ? "active-menu light-blue"
                      : "text-white deactive-menu"
                  }`}
                >
                  <div className="menu-icon">
                    <FaUsers />
                  </div>
                  <div>
                    <p>About-Us</p>
                  </div>
                </div>
              </Link>
              <Link href="/vision-page">
                <div
                  className={`side-menu  ${
                    router.pathname == "/vision-page"
                      ? "active-menu light-blue"
                      : "text-white deactive-menu"
                  }`}
                >
                  <div className="menu-icon">
                    <GiStairsGoal />
                  </div>
                  <div>
                    <p>Vision</p>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
