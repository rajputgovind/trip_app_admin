import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import {
  getSingleWebsiteData,
  updateSettingsData,
} from "../components/apiservice";
import parse from "html-react-parser";
import Editor from "../components/Editor";
const Privacy = () => {
  const router = useRouter();

  const [isLoading, setLoaderState] = useState(false);
  const [policyState, setPolicyState] = useState(true);
  const [editorLoaded, setEditorLoaded] = useState(true);
  const [content, setContent] = useState("");
  const [websiteInfo, setWebsiteInfo] = useState({
    heading: "",
    subheading: "",
    image: "",
    homeBannerImage: "",
    searchBannerImage: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    linkedInUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    email: "",
    termsAndConditions: "",
    privacyPolicy: "",
    aboutUs: "",
    vision: "",
  });
  const [websiteData, setWebsiteData] = useState({});

  const editFunction = () => {
    let token = cookie.get("token");
    if (token) {
      updateSettingsData(
        token,
        setLoaderState,
        router,
        setWebsiteInfo,
        setWebsiteData,
        websiteInfo,
        websiteData?._id,
        "aboutUs"
      );
    } else {
      router.push("/login-page");
    }
  };

  const getWebsiteData = (state) => {
    let token = cookie.get("token");
    if (token) {
      getSingleWebsiteData(
        setLoaderState,
        router,
        setWebsiteData,
        setWebsiteInfo,
        true,
        policyState,
        setPolicyState,
        state
      );
    } else {
      router.push("/login-page");
    }
  };

  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
      getSingleWebsiteData(
        setLoaderState,
        router,
        setWebsiteData,
        setWebsiteInfo,
        false,
        policyState,
        setPolicyState
      );
    } else {
      router.push("/login-page");
    }
  }, []);
  const setEditorFunction = () => {
    setEditorLoaded(true);
  };
  useEffect(() => {
    setEditorFunction();
  }, []);
  const changeBehaviour = (state) => {
    getWebsiteData(state);
  };
  return (
    <>
      <div className="main-content-box">
        {isLoading === true ? (
          <div className="loader-box">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}
        <h1 className="text-3xl text-center font-bold text-black">About Us</h1>
        <div className=" border-2 m-auto lg:w-3/4 mt-5">
          <div className="editor-header flex justify-between items-center bg-[#059DB0] border   m-auto p-2">
            <div className="editor-column"></div>
            <div className="editor-column">
              {policyState && (
                <p className="text-black font-bold text-xl">Edit</p>
              )}
            </div>

            <div className="editor-column flex gap-5">
              <span>
                <CiEdit
                  onClick={() => {
                    changeBehaviour(true);
                  }}
                  className="font-bold  color-black"
                />
              </span>
              <span>
                <FaRegEye
                  onClick={() => {
                    changeBehaviour(false);
                  }}
                  className="color-[#000]"
                />
              </span>
            </div>
          </div>
          <div className="text--editor  mt-5 p-5">
            {policyState === true ? (
              <>
                {" "}
                <Editor
                  name="aboutUs"
                  onChange={(data) => {
                    setWebsiteInfo({
                      ...websiteInfo,
                      aboutUs: data,
                    });
                  }}
                  value={websiteInfo?.aboutUs}
                  editorLoaded={editorLoaded}
                  style={{ height: "134px" }}
                />
              </>
            ) : (
              <div> {websiteData?.aboutUs && parse(websiteData?.aboutUs)}</div>
            )}{" "}
            {/* put editor here */}
          </div>
          {policyState === true && (
            <div className="mb-3 flex justify-end px-4">
              <button
                type="button"
                onClick={editFunction}
                className="bg-[#059DB0] p-3 rounded text-white font-semibold w-[80px]"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Privacy;
