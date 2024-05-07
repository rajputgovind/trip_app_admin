import React, { useEffect, useState } from "react";
import Image from "next/image";
import userimg from "../../public/blank-user.png";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import cookie from "js-cookie";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/router";
import { VscSaveAs } from "react-icons/vsc";
import {
  getSingleTestimonialData,
  addTestominialData,
  editTestinomialData,
} from "../../components/apiservice";
import parse from "html-react-parser";
import Editor from "../../components/Editor";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
const EditTestimonials = ({ id, state }) => {
  const router = useRouter();
  const schemaTestimonial = yup.object().shape({
    name:
      state === "add"
        ? yup
            .string()

            .required("name must be required")
        : "",
    designation:
      state === "add"
        ? yup.string().required("designation must be required")
        : "",
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaTestimonial),
  });
  const [loaderState, setLoaderState] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [testimonialInfo, setTestimonialInfo] = useState({
    description: "",
    designation: "",
    image: "",
    name: "",
  });

  const [content, setContent] = useState("");

  const [editorLoaded, setEditorLoaded] = useState(false);
  const getSingleTestinomial = () => {
    let token = cookie.get("token");
    if (token) {
      if (state !== "add") {
        getSingleTestimonialData(
          token,
          setLoaderState,
          id,
          router,
          setTestimonialInfo,
          testimonialInfo,
          setContent
        );
      }
    } else {
      router.push("/login-page");
    }
  };
  const addTestimonial = () => {
    const token = cookie.get("token");

    if (token) {
      if (content) {
        if (selectedImage !== null) {
          addTestominialData(
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
          );
        } else {
          toast.error("Please select the image");
        }
      } else {
        toast.error("Descrption Must be required");
      }
    } else {
      router.push("/login-page");
    }
  };
  const editTestinomial = (stateData, image) => {
    const token = cookie.get("token");

    if (token) {
      editTestinomialData(
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
      );
    } else {
      router.push("/login-page");
    }
  };
  useEffect(() => {
    getSingleTestinomial();
  }, []);

  return (
    <>
      <div className="main-content-box">
        <div className="setting-content">
          <div className="flex heading text-xl setting-txt">
            {state === "view" ? "View" : state === "edit" ? "Edit" : "Add"}{" "}
            Testimonials
          </div>
        </div>
        <hr className="mt-6 mb-10" />

        <div className="shadow-lg border rounded m-auto mt-5 lg:w-1/2 md:w-4/3 sm:w-full py-4 px-6">
          <div className="user-image-box flex justify-center">
            <div className="user-image">
              {state === "view" ? (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES}/public/testimonialImages/${testimonialInfo?.image}`}
                  />
                </>
              ) : state === "add" ? (
                <>
                  <Image src={userimg} alt="" />
                  {selectedImage && (
                    <div className="uploaded-img--2">
                      <img
                        width="40px"
                        height="auto"
                        src={URL?.createObjectURL(selectedImage)}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                  />

                  <AiOutlinePlus />
                </>
              ) : (
                <>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES}/public/testimonialImages/${testimonialInfo?.image}`}
                  />

                  <input
                    type="file"
                    onChange={(e) => {
                      editTestinomial("image", e.target.files[0]);
                    }}
                  />

                  <AiOutlinePlus />
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-black mt-5">
            <h1 className="mb-0 font-bold">Name</h1>
            {state === "view" ? (
              <div className="border lg:w-3/4 md:w-full h-[60px] rounded mb-0 relative">
                <input
                  disabled={true}
                  type="text"
                  className="w-full h-full p-2"
                  value={testimonialInfo?.name}
                />
              </div>
            ) : state === "add" ? (
              <div className="border lg:w-3/4 md:w-full h-[60px] rounded mb-0 relative">
                <input
                  disabled={state !== "view" ? false : true}
                  type="text"
                  className="w-full h-full p-2"
                  value={testimonialInfo?.name}
                  {...register("name", {
                    onChange: (e) => {
                      setTestimonialInfo({
                        ...testimonialInfo,
                        name: e.target.value,
                      });
                    },
                  })}
                />

                <span style={{ color: "red" }}> {errors?.name?.message}</span>
              </div>
            ) : (
              <div className="border lg:w-3/4 md:w-full h-[60px] rounded mb-0 relative">
                <input
                  disabled={state !== "view" ? false : true}
                  type="text"
                  className="w-full h-full p-2"
                  value={testimonialInfo?.name}
                  onChange={(e) => {
                    setTestimonialInfo({
                      ...testimonialInfo,
                      name: e.target.value,
                    });
                  }}
                />
                {state === "edit" && (
                  <span
                    className="absolute top-3 right-3 border-solid border-2 border-gray-700 p-2 edit--icon rounded-full"
                    onClick={() => {
                      editTestinomial("name");
                    }}
                  >
                   <VscSaveAs />
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-black mt-5 ">
            <h1 className="mb-0 font-bold">Designation</h1>
            {state === "view" ? (
              <div className="border lg:w-3/4 md:w-full h-[60px] rounded mb-0 relative">
                <input
                  disabled={true}
                  type="text"
                  className="w-full h-full p-2"
                  value={testimonialInfo?.designation}
                />
              </div>
            ) : state === "add" ? (
              <div className="border lg:w-3/4 md:w-full h-[60px] rounded mb-0 relative">
                <input
                  type="text"
                  className="w-full h-full p-2"
                  value={testimonialInfo?.designation}
                  {...register("designation", {
                    onChange: (e) => {
                      setTestimonialInfo({
                        ...testimonialInfo,
                        designation: e.target.value,
                      });
                    },
                  })}
                />
                <span style={{ color: "red" }}>
                  {" "}
                  {errors?.designation?.message}
                </span>
              </div>
            ) : (
              <div className="border lg:w-3/4 md:w-full h-[60px] rounded mb-0 relative">
                <input
                  disabled={state !== "view" ? false : true}
                  type="text"
                  className="w-full h-full p-2"
                  value={testimonialInfo?.designation}
                  onChange={(e) => {
                    setTestimonialInfo({
                      ...testimonialInfo,
                      designation: e.target.value,
                    });
                  }}
                />

                <span
                  className="absolute top-3 right-3 border-solid border-2 border-gray-700 p-2 edit--icon rounded-full"
                  onClick={() => {
                    editTestinomial("designation");
                  }}
                >
                 <VscSaveAs />
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-black mt-5">
            <h1 className="mb-0 font-bold">Description</h1>
            <div className="border lg:w-3/4 md:w-full  rounded mb-0 relative">
              {state === "view" ? (
                <textarea
                  disabled={state !== "view" ? false : true}
                  className="w-full p-2"
                  value={content&&parse(content)}
                />
              ) : state === "add" ? (
                <>
                  <Editor
                    name="termsAndConditions"
                    onChange={(data) => {
                      setContent(data);
                    }}
                    value={content}
                    editorLoaded={editorLoaded}
                    style={{ height: "134px" }}
                  />
                </>
              ) : (
                <>
                  <div className="pr-16">
                    <Editor
                      name="termsAndConditions"
                      onChange={(data) => {
                        setContent(data);
                      }}
                      value={content}
                      editorLoaded={editorLoaded}
                      style={{ height: "134px" }}
                    />
                  </div>
                  <span
                    className="absolute top-3 right-3 border-solid border-2 border-gray-700 p-2 edit--icon rounded-full"
                    onClick={() => {
                      editTestinomial("description");
                    }}
                  >
                    <VscSaveAs />
                  </span>
                </>
              )}
            </div>
          </div>
          {state === "add" && (
            <div className="mt-3 flex justify-end">
            <button type="button" onClick={handleSubmit(addTestimonial)} className="bg-[#059DB0] p-3 rounded text-white font-semibold w-[80px]">
              Add
            </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditTestimonials;
