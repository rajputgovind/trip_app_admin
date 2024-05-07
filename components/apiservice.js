import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import commonFunction from "../commonFunctions/dateTime";
export const loginFunction = async (email, password, setLoading, router) => {
  try {
    setLoading(true);
    let loginInfo = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      }
    );

    cookie.set("token", loginInfo?.data?.token);
    setLoading(false);
    toast.success("login Successfully");
    router.push("/");
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    }
  }
};

export const getAllUsers = async (
  token,
  setLoaderState,
  router,
  setuserInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,
  status,
  setdownloadData
) => {
  try {
    if (!searchKeyWord) {
      setLoaderState(true);
    }

    let url = "";
    if (searchKeyWord) {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-all-users?page=${currentPage}&search=${searchKeyWord}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-all-users?page=${currentPage}`;
    }
    let userInformation = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status === true) {
      getAllUsersDownload(token, setLoaderState, router, setdownloadData);
    }
    setLoaderState(false);

    setuserInfo(userInformation?.data?.data?.docs);
    setPageCount(userInformation?.data?.data?.totalDocs);
    setLimit(userInformation?.data?.data?.limit);
  } catch (err) {
    setLoaderState(false);
    console.log("err", err);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getAllUsersDownload = async (
  token,
  setLoaderState,
  router,
  setdownloadData
) => {
  try {
    setLoaderState(true);
    // console.log("hello");
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/download-all-users`;

    let userInformation = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLoaderState(false);

    const userData = userInformation?.data?.data?.map((information) => {
      return {
        Name: information?.name,
        Email: information?.email,
        BirthDate: commonFunction(information?.birthDate),
        PhoneNumber: information?.phone,
        CreatedAt: commonFunction(information?.createdAt),
      };
    });
    setdownloadData(userData);
  } catch (err) {
    setLoaderState(false);

    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getAllOrganizers = async (
  token,
  setLoaderState,
  router,
  setorganizerInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,
  status,
  setdownloadData
) => {
  try {
    if (!searchKeyWord) {
      setLoaderState(true);
    }
    let url = "";
    if (searchKeyWord) {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/organizers/get-all-organizers?page=${currentPage}&search=${searchKeyWord}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/organizers/get-all-organizers?page=${currentPage}`;
    }
    let organizerInformation = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (status === true) {
      getAllOrganizerDownload(token, setLoaderState, router, setdownloadData);
    }
    setLoaderState(false);
    setorganizerInfo(organizerInformation?.data?.data?.docs);
    setPageCount(organizerInformation?.data?.data?.totalDocs);
    setLimit(organizerInformation?.data?.data?.limit);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getAllOrganizerDownload = async (
  token,
  setLoaderState,
  router,
  setdownloadData
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/organizers/download-all-organizers`;

    let organizerInformation = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLoaderState(false);

    const organizerData = organizerInformation?.data?.data?.map(
      (information) => {
        return {
          Name: information?.name,
          Email: information?.email,
          BirthDate: commonFunction(information?.birthDate),
          PhoneNumber: information?.phone,
          CreatedAt: commonFunction(information?.createdAt),
        };
      }
    );
    setdownloadData(organizerData);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const toggleChangeFunctionApi = async (
  token,
  setLoaderState,
  router,
  setorganizerInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,
  id,
  status
) => {
  try {
    setLoaderState(true);
    let toggleChange = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/approve-organizer/${id}`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getAllOrganizers(
      token,
      setLoaderState,
      router,
      setorganizerInfo,
      currentPage,
      setPageCount,
      setLimit,
      searchKeyWord
    );
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const deleteUserOrganizerFunction = async (
  token,
  setLoaderState,
  id,
  role,
  router,
  setorganizerInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,
  setIsOpenDelete,
  setdownloadData
) => {
  try {
    setLoaderState(true);
    let deleteUser = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (role === "user") {
      getAllUsers(
        token,
        setLoaderState,
        router,
        setorganizerInfo,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord,
        true,
        setdownloadData
      );
    } else if (role === "organizer") {
      getAllOrganizers(
        token,
        setLoaderState,
        router,
        setorganizerInfo,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord,
        true,
        setdownloadData
      );
    }

    setIsOpenDelete(false);
    toast.success(deleteUser?.data?.message);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllSettings = async (
  token,
  setLoaderState,
  router,
  setSettingsData,
  settingsData
) => {
  try {
    setLoaderState(true);
    let getSettingsData = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/filters/get-all-filters`
    );

    setSettingsData({
      ...settingsData,

      groupType: getSettingsData?.data?.data?.groupType,

      tripType: getSettingsData?.data?.data?.tripType,
      country: getSettingsData?.data?.data?.country,
      aboutUs: getSettingsData?.data?.data?.aboutUs,
      vision: getSettingsData?.data?.data?.vision,
    });

    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const changeSettingsData = async (
  token,
  setLoaderState,
  router,
  changeSettings,
  setChangeSettings
) => {
  try {
    setLoaderState(true);
    let changeSettingsInformation = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/filters/apply-filter`,
      changeSettings,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getAllSettings(
      token,
      setLoaderState,
      router,
      setChangeSettings,
      changeSettings
    );
    toast.success("Settings Updated Successfully");
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getProfile = async (
  token,
  setLoaderState,
  router,
  setEmail,
  setAdminInfo,
  adminInfo
) => {
  try {
    setLoaderState(true);
    let adminProfile = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-single-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let newDate = new Date(adminProfile?.data?.data?.birthDate)
      .toISOString()
      .split("T")[0];
    setEmail(adminProfile?.data?.data?.email);

    setAdminInfo({
      ...adminInfo,
      name: adminProfile?.data?.data?.name,
      birthDate: newDate,
      phone: adminProfile?.data?.data?.phone,
    });

    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    }
  }
};
export const changeProfile = async (
  token,
  setLoaderState,
  router,
  setEmail,
  setAdminInfo,
  adminInfo,
  password,
  setProfileState,
  profileState
) => {
  try {
    setLoaderState(true);
    let newObj = {};

    newObj.name = adminInfo?.name;

    newObj.phone = adminInfo?.phone;

    newObj.birthDate = adminInfo?.birthDate;

    if (password) {
      newObj.password = password;
    }
    let changeProfileInformation = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/update`,
      newObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getProfile(
      token,
      setLoaderState,
      router,
      setEmail,
      setAdminInfo,
      adminInfo
    );
    newObj = {};
    setProfileState(!profileState);
    toast.success("Profile Updated Successfully");
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);

    getProfile(
      token,
      setLoaderState,
      router,
      setEmail,
      setAdminInfo,
      adminInfo
    );
    if (err?.response?.data?.errMessages) {
      if (err?.response?.data?.errMessages[0]?.phone) {
        toast.error(err?.response?.data?.errMessages[0]?.phone);
      } else if (err?.response?.data?.errMessages[0]?.name) {
        toast.error(err?.response?.data?.errMessages[0]?.name);
      } else if (err?.response?.data?.errMessages[0]?.birthDate) {
        toast.error(err?.response?.data?.errMessages[0]?.birthDate);
      } else if (err?.response?.data?.errMessages[0]?.password) {
        toast.error(err?.response?.data?.errMessages[0]?.password);
      }
    } else if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllTrips = async (
  token,
  setLoaderState,
  router,
  setTripData,
  tripData,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,

  selectedOptionType,
  selectedOptionGroupType,
  selectedCountry,
  setIsOpenDelete
) => {
  try {
    if (!searchKeyWord && !selectedOptionType && !selectedOptionGroupType) {
      setLoaderState(true);
    }

    let tripInfo = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-all-trips?page=${currentPage}&search=${searchKeyWord}&tripType=${selectedOptionGroupType}&groupType=${selectedOptionType}&country=${selectedCountry}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(
      "tripInfo",
      tripInfo?.data?.data?.docs,
      "docs Info",
      tripInfo?.data?.data?.totalDocs,
      "Limit",
      tripInfo?.data?.data?.limit
    );
    setTripData(tripInfo?.data?.data?.docs);
    setPageCount(tripInfo?.data?.data?.totalDocs);
    setLimit(tripInfo?.data?.data?.limit);
    setIsOpenDelete(false);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const toggleChangeFunctionTrips = async (
  token,
  setLoaderState,
  router,
  setTripData,
  tripData,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,

  selectedOptionType,
  selectedOptionGroupType,
  selectedCountry,
  id,
  status,
  setIsOpenDelete
) => {
  try {
    setLoaderState(true);
    let toggleChange = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/update-trip-visibility/${id}`,
      { tripVisibility: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getAllTrips(
      token,
      setLoaderState,
      router,
      setTripData,
      tripData,
      currentPage,
      setPageCount,
      setLimit,
      searchKeyWord,

      selectedOptionType,
      selectedOptionGroupType,
      selectedCountry,
      setIsOpenDelete
    );
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getSingleTrip = async (token, setLoaderState, router) => {
  try {
    // setLoaderState(true);
    let tripInfo = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTripData(tripInfo?.data?.data?.docs);
    setPageCount(tripInfo?.data?.data?.totalDocs);
    setLimit(tripInfo?.data?.data?.limit);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const updateSettings = async (
  token,
  setLoaderState,
  router,
  setWebsiteInfo,
  setWebsiteData,
  selectedData,
  websiteInfo,

  id,
  selectedHomePage,
  selectedBannerPage
) => {
  try {
    setLoaderState(true);
    const formData = new FormData();
    if (selectedData) {
      formData.append("mainLogo", selectedData);
    }
    // if (websiteInfo?.subheading) {
    formData.append("mainContent", websiteInfo?.subheading);
    formData.append("heading", websiteInfo?.heading);
    formData.append("email", websiteInfo?.email);
    // }

    // if (websiteInfo?.heading) {
    formData.append("address", websiteInfo?.address);

    formData.append("state", websiteInfo?.state ? websiteInfo?.state : "");
    formData.append("city", websiteInfo?.city ? websiteInfo?.city : "");
    formData.append(
      "linkedInUrl",
      websiteInfo?.linkedInUrl ? websiteInfo?.linkedInUrl : ""
    );
    formData.append(
      "facebookUrl",
      websiteInfo?.facebookUrl ? websiteInfo?.facebookUrl : ""
    );
    formData.append(
      "twitterUrl",
      websiteInfo?.twitterUrl ? websiteInfo?.twitterUrl : ""
    );
    formData.append(
      "instagramUrl",
      websiteInfo?.instagramUrl ? websiteInfo?.instagramUrl : ""
    );
    formData.append(
      "zipCode",
      websiteInfo?.zipCode ? websiteInfo?.zipCode : ""
    );
    // }
    if (selectedHomePage) {
      formData.append("homePageBannerImage", selectedHomePage);
    }
    if (selectedBannerPage) {
      formData.append("searchPageBannerImage", selectedBannerPage);
    }

    let updateData = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/update-setting/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(updateData?.data?.message);
    getSingleWebsiteData(
      setLoaderState,
      router,
      setWebsiteData,
      setWebsiteInfo,
      false
    );

    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      if (err?.response?.data?.message[0]) {
        if (err?.response?.data?.message[0]?.mainContent) {
          toast.error(err?.response?.data?.message[0]?.mainContent);
        } else if (err?.response?.data?.message[0]?.heading) {
          toast.error(err?.response?.data?.message[0]?.heading);
        } else if (err?.response?.data?.message[0]?.mainLogo) {
          toast.error(err?.response?.data?.message[0]?.mainLogo);
        } else if (err?.response?.data?.message[0]?.address) {
          toast.error(err?.response?.data?.message[0]?.address);
        } else if (err?.response?.data?.message[0]?.state) {
          toast.error(err?.response?.data?.message[0]?.state);
        } else if (err?.response?.data?.message[0]?.twitterUrl) {
          toast.error(err?.response?.data?.message[0]?.twitterUrl);
        } else if (err?.response?.data?.message[0]?.city) {
          toast.error(err?.response?.data?.message[0]?.city);
        } else if (err?.response?.data?.message[0]?.zipCode) {
          toast.error(err?.response?.data?.message[0]?.zipCode);
        } else if (err?.response?.data?.message[0]?.linkedInUrl) {
          toast.error(err?.response?.data?.message[0]?.linkedInUrl);
        } else if (err?.response?.data?.message[0]?.facebookUrl) {
          toast.error(err?.response?.data?.message[0]?.facebookUrl);
        } else if (err?.response?.data?.message[0]?.instagramUrl) {
          toast.error(err?.response?.data?.message[0]?.instagramUrl);
        } else if (err?.response?.data?.message[0]?.homePageBannerImage) {
          toast.error(err?.response?.data?.message[0]?.homePageBannerImage);
        } else if (err?.response?.data?.message[0]?.searchPageBannerImage) {
          toast.error(err?.response?.data?.message[0]?.searchPageBannerImage);
        } else if (err?.response?.data?.message[0]?.email) {
          toast.error(err?.response?.data?.message[0]?.email);
        }
      } else {
        toast.error(err?.response?.data?.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getSingleWebsiteData = async (
  setLoaderState,
  router,
  setWebsiteData,
  setWebsiteInfo,
  state,
  editState,
  setEditState,
  stateData
) => {
  try {
    setLoaderState(true);
    let singleSettignsData = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/get-settings`
    );

    setWebsiteData(singleSettignsData?.data?.data);
    setWebsiteInfo({
      heading: singleSettignsData?.data?.data?.heading
        ? singleSettignsData?.data?.data?.heading
        : "",
      subheading: singleSettignsData?.data?.data?.mainContent
        ? singleSettignsData?.data?.data?.mainContent
        : "",
      image: singleSettignsData?.data?.data?.mainLogo
        ? singleSettignsData?.data?.data?.mainLogo
        : "",
      homeBannerImage: singleSettignsData?.data?.data?.homePageBannerImage
        ? singleSettignsData?.data?.data?.homePageBannerImage
        : "",
      searchBannerImage: singleSettignsData?.data?.data?.searchPageBannerImage
        ? singleSettignsData?.data?.data?.searchPageBannerImage
        : "",
      address: singleSettignsData?.data?.data?.address
        ? singleSettignsData?.data?.data?.address
        : "",
      state: singleSettignsData?.data?.data?.state
        ? singleSettignsData?.data?.data?.state
        : "",
      city: singleSettignsData?.data?.data?.city
        ? singleSettignsData?.data?.data?.city
        : "",
      zipCode: singleSettignsData?.data?.data?.zipCode
        ? singleSettignsData?.data?.data?.zipCode
        : "",
      linkedInUrl: singleSettignsData?.data?.data?.linkedInUrl
        ? singleSettignsData?.data?.data?.linkedInUrl
        : "",
      facebookUrl: singleSettignsData?.data?.data?.facebookUrl
        ? singleSettignsData?.data?.data?.facebookUrl
        : "",
      twitterUrl: singleSettignsData?.data?.data?.twitterUrl
        ? singleSettignsData?.data?.data?.twitterUrl
        : "",
      instagramUrl: singleSettignsData?.data?.data?.instagramUrl
        ? singleSettignsData?.data?.data?.instagramUrl
        : "",
      email: singleSettignsData?.data?.data?.email
        ? singleSettignsData?.data?.data?.email
        : "",
      termsAndConditions: singleSettignsData?.data?.data?.termsAndConditions
        ? singleSettignsData?.data?.data?.termsAndConditions
        : "",
      privacyPolicy: singleSettignsData?.data?.data?.privacyPolicy
        ? singleSettignsData?.data?.data?.privacyPolicy
        : "",
      aboutUs: singleSettignsData?.data?.data?.aboutUs
        ? singleSettignsData?.data?.data?.aboutUs
        : "",
      vision: singleSettignsData?.data?.data?.vision
        ? singleSettignsData?.data?.data?.vision
        : "",
    });

    if (stateData === editState) {
    } else {
      setEditState(!editState);
    }
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const updateSettingsData = async (
  token,
  setLoaderState,
  router,
  setWebsiteInfo,
  setWebsiteData,
  websiteInfo,
  id,
  state
) => {
  try {
    setLoaderState(true);
    const formData = new FormData();
    if (state === false) {
      formData.append("termsAndConditions", websiteInfo?.termsAndConditions);
    } else if (state === true) {
      formData.append("privacyPolicy", websiteInfo?.privacyPolicy);
    } else if (state === "aboutUs") {
      formData.append("aboutUs", websiteInfo?.aboutUs);
    } else if (state === "vision") {
      formData.append("vision", websiteInfo?.vision);
    }
    let updateData = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/update-setting/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(updateData?.data?.message);
    getSingleWebsiteData(
      setLoaderState,
      router,
      setWebsiteData,
      setWebsiteInfo,
      false
    );

    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      if (err?.response?.data?.message[0]) {
        if (err?.response?.data?.message[0]?.termsAndConditions) {
          toast.error(err?.response?.data?.message[0]?.termsAndConditions);
        } else if (err?.response?.data?.message[0]?.privacyPolicy) {
          toast.error(err?.response?.data?.message[0]?.privacyPolicy);
        } else if (err?.response?.data?.message[0]?.vision) {
          toast.error(err?.response?.data?.message[0]?.vision);
        } else if (err?.response?.data?.message[0]?.aboutUs) {
          toast.error(err?.response?.data?.message[0]?.aboutUs);
        }
      } else {
        toast.error(err?.response?.data?.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getAllTestinomial = async (
  token,
  setLoaderState,
  router,
  setTestimonialInfo
) => {
  try {
    setLoaderState(true);

    let url = "";

    url = `${process.env.NEXT_PUBLIC_BASE_URL}/testimonials`;

    let testimonial = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLoaderState(false);
    setTestimonialInfo(testimonial?.data?.testimonials);
  } catch (err) {
    setLoaderState(false);
    console.log("err", err);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getSingleTestimonialData = async (
  token,
  setLoaderState,
  id,

  router,
  setTestimonialInfo,
  testimonialInfo,
  setContent
) => {
  try {
    setLoaderState(true);
    let testimonialInform = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/testimonials/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTestimonialInfo({
      ...testimonialInfo,

      designation: testimonialInform?.data?.testimonial?.designation,

      name: testimonialInform?.data?.testimonial?.name,
      image: testimonialInform?.data?.testimonial?.image,
    });
    setContent(testimonialInform?.data?.testimonial?.description);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const deleteTestominialData = async (
  token,
  setLoaderState,
  id,

  router,
  setTestimonialInfo,

  setIsOpenDelete
) => {
  try {
    setLoaderState(true);
    let deleteUser = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/testimonials/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getAllTestinomial(token, setLoaderState, router, setTestimonialInfo);

    setIsOpenDelete(false);
    toast.success(deleteUser?.data?.message);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const addTestominialData = async (
  token,
  setLoaderState,

  router,
  testimonialInfo,
  selectedImage,
  reset,
  setValue,
  setTestimonialInfo,
  content,
  setContent,
  setSelectedImage
) => {
  try {
    setLoaderState(true);
    const formData = new FormData();
    formData.append("name", testimonialInfo?.name);
    formData.append("image", selectedImage);
    formData.append("designation", testimonialInfo?.designation);
    formData.append("description", content);

    let addTestimonial = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/testimonials/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(addTestimonial?.data?.message);
    reset();
    setValue("name", "");
    setValue("designation", "");
    setSelectedImage(null);
    setTestimonialInfo({
      ...testimonialInfo,
      name: "",
      designation: "",
      image: "",
    });
    setContent("");
    // router.push("/testimonials")
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const editTestinomialData = async (
  token,
  setLoaderState,
  id,
  router,
  setTestimonialInfo,
  testimonialInfo,
  setContent,
  stateData,

  image,
  content
) => {
  try {
    setLoaderState(true);
    const formData = new FormData();
    if (stateData === "name") {
      formData.append("name", testimonialInfo?.name);
    } else if (stateData === "image") {
      formData.append("image", image);
    } else if (stateData === "designation") {
      formData.append("designation", testimonialInfo?.designation);
    } else {
      formData.append("description", content);
    }

    let editTestimonial = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/testimonials/edit/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(editTestimonial?.data?.message);

    getSingleTestimonialData(
      token,
      setLoaderState,
      id,
      router,
      setTestimonialInfo,
      testimonialInfo,
      setContent
    );
    // router.push("/testimonials");
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);

    if (err?.response?.data?.errMessages) {
      if (err?.response?.data?.errMessages[0]?.name) {
        toast.error(err?.response?.data?.errMessages[0]?.name);
      } else if (err?.response?.data?.errMessages[0]?.image) {
        toast.error(err?.response?.data?.errMessages[0]?.image);
      } else if (err?.response?.data?.errMessages[0]?.designation) {
        toast.error(err?.response?.data?.errMessages[0]?.designation);
      } else if (err?.response?.data?.errMessages[0]?.description) {
        toast.error(err?.response?.data?.errMessages[0]?.description);
      }
    } else if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const deleteTripData = async (
  token,
  setLoaderState,
  router,
  setTripData,
  tripData,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,
  id,
  selectedOptionType,
  selectedOptionGroupType,
  selectedCountry,
  setIsOpenDelete
) => {
  try {
    setLoaderState(true);
    const deletetrip = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/delete-trip/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(deletetrip?.data?.message);
    getAllTrips(
      token,
      setLoaderState,
      router,
      setTripData,
      tripData,
      currentPage,
      setPageCount,
      setLimit,
      searchKeyWord,

      selectedOptionType,
      selectedOptionGroupType,
      selectedCountry,
      setIsOpenDelete
    );
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("هناك خطأ ما!");
    }
  }
};
