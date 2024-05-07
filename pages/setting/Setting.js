import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import {
  getAllSettings,
  changeSettingsData,
  getSingleWebsiteData,
  updateSettings,
} from "../../components/apiservice";

import cookie from "js-cookie";

import logoimg from "../../public/Logo.svg";

function Setting() {
  const [isLoading, setLoaderState] = useState(false);
  const router = useRouter();

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

  const [selectedHomePage, setSelectedHomePage] = useState(null);
  const [selectedBannerPage, setSelectedBannerPage] = useState(null);

  const [changeSettings, setChangeSettings] = useState({
    groupType: false,
    tripType: false,
    country: false,
    aboutUs: false,
    vision: false,
  });

  const [editState, setEditState] = useState(false);

  const [websiteData, setWebsiteData] = useState({});
  const [selectedData, setSelectedData] = useState(null);
  const [checkboxState, setCheckBox] = useState(false);

  const changeSettingInfo = () => {
    let token = cookie.get("token");

    if (token) {
      changeSettingsData(
        token,
        setLoaderState,
        router,
        changeSettings,
        setChangeSettings
      );
    } else {
      router.push("/login-page");
    }
  };

  const editSettings = () => {
    let token = cookie.get("token");

    if (token) {
      updateSettings(
        token,
        setLoaderState,
        router,
        setWebsiteInfo,
        setWebsiteData,
        selectedData,
        websiteInfo,

        websiteData?._id,
        selectedHomePage,
        selectedBannerPage
      );
    } else {
      router.push("/login-page");
    }
  };
  const changeEditBehaviour = () => {
    getSingleWebsiteData(
      setLoaderState,
      router,
      setWebsiteData,
      setWebsiteInfo,
      true,
      editState,
      setEditState
    );
    // setEditState(!editState);
  };
  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
      getAllSettings(
        token,
        setLoaderState,
        router,
        setChangeSettings,
        changeSettings
      );
    } else {
      router.push("/login-page");
    }
  }, []);
  useEffect(() => {
    getSingleWebsiteData(
      setLoaderState,
      router,
      setWebsiteData,
      setWebsiteInfo,
      false,
      editState,
      setEditState
    );
  }, []);
  useEffect(() => {
    if (checkboxState === true) {
      changeSettingInfo();
    }
  }, [
    changeSettings?.groupType,
    changeSettings?.country,
    changeSettings?.aboutUs,
    changeSettings?.tripType,
    changeSettings?.vision,
  ]);
  
  return (
    <>
      <div className="main-content-box">
        <div className="setting-content">
          <div className="flex heading text-xl setting-txt">Settings</div>
        </div>

        <hr className="mt-6 mb-6" />
        {isLoading === true ? (
          <div className="loader-box">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}

        <div className="container mx-auto">
          <div className="flex-container flex-wrap justify-between grid gap-1 mb-5">
            <div className="w-full">
              <div className="w-1/2 manage-setting-width">
                <div className="table text-gray">
                  <table className="user-table w-full text-sm text-left ">
                    <tbody className="settings-table">
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6"> Group Type</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          <label class="toggle">
                            <input
                              type="checkbox"
                              checked={changeSettings?.groupType ? true : false}
                              onChange={() => {
                                // setCheckBox(true);
                                setChangeSettings({
                                  ...changeSettings,
                                  groupType: !changeSettings.groupType,
                                });
                              }}
                            />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">Trip Type</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          <label class="toggle">
                            <input
                              type="checkbox"
                              checked={changeSettings?.tripType ? true : false}
                              onChange={() => {
                                setCheckBox(true);
                                setChangeSettings({
                                  ...changeSettings,
                                  tripType: !changeSettings.tripType,
                                });
                              }}
                            />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">Country</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          <label class="toggle">
                            <input
                              type="checkbox"
                              checked={changeSettings?.country ? true : false}
                              onChange={() => {
                                setCheckBox(true);
                                setChangeSettings({
                                  ...changeSettings,
                                  country: !changeSettings.country,
                                });
                              }}
                            />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>

                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">Vision Option</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          <label class="toggle">
                            <input
                              type="checkbox"
                              checked={changeSettings?.vision ? true : false}
                              onChange={() => {
                                setCheckBox(true);
                                setChangeSettings({
                                  ...changeSettings,
                                  vision: !changeSettings.vision,
                                });
                              }}
                            />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">About-Us Option</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          <label class="toggle">
                            <input
                              type="checkbox"
                              checked={changeSettings?.aboutUs ? true : false}
                              onChange={() => {
                                setCheckBox(true);
                                setChangeSettings({
                                  ...changeSettings,
                                  aboutUs: !changeSettings.aboutUs,
                                });
                              }}
                            />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="logo-container w-1/2 py-4 px-6">
            <button
              className="edit--btn mb-0  p-2 rounded text-white flex justify-center "
              onClick={changeEditBehaviour}
            >
              {editState === false ? "Edit" : "View"}
            </button>
            <div className="logo-content">
              <p className="font-bold">Logo</p>
              {editState === false ? (
                <div className="logo-img-box mb-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripLogoImages/${websiteData?.mainLogo}`}
                  />
                </div>
              ) : (
                <div className="logo-img-box mb-0">
                  {selectedData && (
                    <div className="uploaded-img">
                      <Image
                        alt="not fount"
                        width={100}
                        height={100}
                        src={URL?.createObjectURL(selectedData)}
                      />
                    </div>
                  )}{" "}
                  {websiteInfo?.image && (
                    <div className="uploaded-img">
                      <img
                        alt="not fount"
                        width={100}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripLogoImages/${websiteInfo?.image}`}
                      />
                    </div>
                  )}
                  {!selectedData && !websiteInfo?.image && (
                    <Image src={logoimg} alt="" />
                  )}
                  <input
                    type="file"
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    onChange={(event) => {
                      setSelectedData(event.target.files[0]);
                      setWebsiteInfo({ ...websiteInfo, image: null });
                    }}
                  />
                </div>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Heading</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.heading ? websiteData?.heading : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.heading}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        heading: e.target.value,
                      });
                    }}
                  />
                </p>
              )}{" "}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Sub Heading</h1>
              {editState === false ? (
                <p className=" border p-2 mb-0 rounded">
                  {websiteData?.mainContent ? websiteData?.mainContent : ""}
                </p>
              ) : (
                <p className=" border p-2 mb-0 rounded">
                  <input
                    type="text"
                    value={websiteInfo?.subheading}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        subheading: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>

            <div className="logo-content mt-5">
              <p className="font-bold">Background image for home page</p>
              {editState === false ? (
                <div className="logo-img-box mb-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripLogoImages/${websiteData?.homePageBannerImage}`}
                  />
                </div>
              ) : (
                <div className="img-input--box">
                  <div className="bg--img-box ">
                    {selectedHomePage && (
                      <div className="uploaded--img">
                        <Image
                          alt="not fount"
                          width={100}
                          height={100}
                          src={URL?.createObjectURL(selectedHomePage)}
                        />
                      </div>
                    )}{" "}
                    {websiteInfo?.homeBannerImage && (
                      <div className="uploaded--img">
                        <img
                          alt="not fount"
                          width={100}
                          height={100}
                          src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripLogoImages/${websiteInfo?.homeBannerImage}`}
                        />
                      </div>
                    )}
                    {!selectedHomePage && !websiteInfo?.homeBannerImage && (
                      <div className="uploaded--img">
                        <Image src={logoimg} alt="" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    onChange={(event) => {
                      setSelectedHomePage(event.target.files[0]);
                      setWebsiteInfo({ ...websiteInfo, homeBannerImage: null });
                    }}
                  />
                </div>
              )}
            </div>
            <div className="logo-content mt-5">
              <p className="font-bold">Background image for search page</p>
              {editState === false ? (
                <div className="logo-img-box mb-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripLogoImages/${websiteData?.searchPageBannerImage}`}
                  />
                </div>
              ) : (
                <div className="img-input--box">
                  <div className="bg--img-box ">
                    {selectedBannerPage && (
                      <div className="uploaded--img">
                        <Image
                          alt="not fount"
                          width={100}
                          height={100}
                          src={URL?.createObjectURL(selectedBannerPage)}
                        />
                      </div>
                    )}{" "}
                    {websiteInfo?.searchBannerImage && (
                      <div className="uploaded--img">
                        <img
                          alt="not fount"
                          width={100}
                          height={100}
                          src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripLogoImages/${websiteInfo?.searchBannerImage}`}
                        />
                      </div>
                    )}
                    {!selectedBannerPage && !websiteInfo?.searchBannerImage && (
                      <div className="uploaded--img">
                        <Image src={logoimg} alt="" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    onChange={(event) => {
                      setSelectedBannerPage(event.target.files[0]);
                      setWebsiteInfo({
                        ...websiteInfo,
                        searchBannerImage: null,
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Linked In URL</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.linkedInUrl ? websiteData?.linkedInUrl : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.linkedInUrl}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        linkedInUrl: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Instagram URL</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.instagramUrl ? websiteData?.instagramUrl : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.instagramUrl}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        instagramUrl: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Twitter URL</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.twitterUrl ? websiteData?.twitterUrl : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.twitterUrl}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        twitterUrl: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Facebook URL</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.facebookUrl ? websiteData?.facebookUrl : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.facebookUrl}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        facebookUrl: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>

            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Address</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.address ? websiteData?.address : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.address}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        address: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">City</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.city ? websiteData?.city : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.city}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        city: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">State</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.state ? websiteData?.state : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.state}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        state: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Zip Code</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.zipCode ? websiteData?.zipCode : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.zipCode}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        zipCode: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>
            <div className="text--content mt-5">
              <h1 className="mb-0 font-bold">Email</h1>
              {editState === false ? (
                <p className=" border p-2 rounded mb-0">
                  {websiteData?.email ? websiteData?.email : ""}
                </p>
              ) : (
                <p className=" border p-2 rounded mb-0">
                  <input
                    type="text"
                    value={websiteInfo?.email}
                    onChange={(e) => {
                      setWebsiteInfo({
                        ...websiteInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                </p>
              )}
            </div>

            {editState === true && (
              <div className="modal-btn flex justify-center mt-6">
                <button
                  type="button"
                  className="bg-[#059DB0] p-4 text-white btn-add font-semibold"
                  onClick={() => {
                    editSettings();
                  }}
                >
                  {isLoading && <div className="loader loader-img"></div>}
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
