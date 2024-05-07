import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import searchIcon from "../../public/search-icon.svg";

import cookie from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Pagination from "react-js-pagination";
import chevronrighticon from "../../public/chevron-right-icon.svg";
import chevronlefticon from "../../public/chevron-left-icon.svg";
import doublearrowleft from "../../public/double-arrow-left.svg";
import doublearrowright from "../../public/double-arrow-right.svg";
import closeIcon from "../../public/close-icon.svg";
import Modal from "react-modal";
import userimg from "../../public/blank-user.png";
import { BsFillEyeFill, BsFillChatDotsFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import {
  getAllTestinomial,
  deleteTestominialData,
} from "../../components/apiservice";
const Testimonials = () => {
  const [testimonialInfo, setTestimonialInfo] = useState([]);
  const [modalIsOpenDelete, setIsOpenDelete] = React.useState(false);

  const [isLoading, setLoaderState] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState();
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModalDelete() {
    setIsOpenDelete(false);
  }

  const deleteFunction = (id) => {
    let token = cookie.get("token");
    if (token) {
      setDeleteUserId(id);
      setIsOpenDelete(true);
    } else {
      router.push("/login-page");
    }
  };

  const deleteTestominial = () => {
    let token = cookie.get("token");
    if (token) {
      deleteTestominialData(
        token,
        setLoaderState,
        deleteUserId,
        router,
        setTestimonialInfo,

        setIsOpenDelete
      );
    } else {
      router.push("/login-page");
    }
  };

  const addTestimonial = () => {
    const token = cookie.get("token");
    if (token) {
      router.push("/edit-testimonials?state=add");
    } else {
      router.push("/login-page");
    }
  };

  const viewTestimonial = (id) => {
    const token = cookie.get("token");
    if (token) {
      router.push(`/edit-testimonials?state=view&id=${id}`);
    } else {
      router.push("/login-page");
    }
  };
  const editPage = (id) => {
    const token = cookie.get("token");
    if (token) {
      router.push(`/edit-testimonials?state=edit&id=${id}`);
    } else {
      router.push("/login-page");
    }
  };
  const getAllTestinomials = () => {
    const token = cookie.get("token");
    if (token) {
      getAllTestinomial(token, setLoaderState, router, setTestimonialInfo);
    } else {
      router.push("/login-page");
    }
  };
  useEffect(() => {
    getAllTestinomials();
  }, []);
  return (
    <>
      <div className="main-content-box" data-testid="result">
        <div className="flex-text text-left heading text-xl mb-4">
          <span>Testimonials </span>
          <div className="download-btn">
            <button
              type="button"
              className="edit--btn excel--btn"
              onClick={() => {
                addTestimonial();
              }}
            >
              Add Testimonial
            </button>
          </div>
        </div>

        <hr className="mt-6 mb-6" />
        {isLoading === true ? (
          <div className="loader-box">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}
        <div className="overflow-x-auto">
          <table className="user-table w-full text-sm text-left ">
            <thead className="text-gray">
              <tr className=" border-b ">
                <td scope="col" className="py-3 px-6">
                  <span className="flex-heading">
                    <span> Image </span>
                  </span>
                </td>
                <td scope="col" className="py-3 px-2">
                  <span className="flex-heading">
                    <span> Name </span>
                  </span>
                </td>
                <td scope="col" className="py-3 px-2">
                  Designation
                </td>

                <td scope="col" className="py-3 px-2">
                  Action
                </td>
              </tr>
            </thead>
            <tbody className="text-gray">
              {testimonialInfo?.map((testinomial, index) => {
                return (
                  <tr className="bg-white border-b " key={index}>
                    <td className="py-4 px-6">
                      <div className="person-img--box">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGES}/public/testimonialImages/${testinomial?.image}`}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="py-4 px-2">{testinomial?.name}</td>
                    <td className="py-4 px-2">{testinomial?.designation}</td>

                    <td className="py-4 px-2">
                      <div className="flex gap-5 items-center">
                        <button
                          type="button"
                          onClick={() => {
                            viewTestimonial(testinomial?._id);
                          }}
                        >
                          <FaRegEye />
                        </button>

                        <button
                          className="mb-0 h-6"
                          onClick={() => {
                            editPage(testinomial?._id);
                          }}
                        >
                          <CiEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            deleteFunction(testinomial?._id);
                          }}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          {/* {testimonialInfo?.length > 0 ? (
            <div className="flex table-pagination flex-end justify-end">
              <ul className="inline-flex items-center gap-1 ">
                <li>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={limit}
                    totalItemsCount={pageCount}
                    onChange={(page) => {
                      setCurrentPage(page);
                    }}
                    nextPageText={
                      <Image unoptimized src={chevronrighticon} alt="hh" />
                    }
                    prevPageText={
                      <Image unoptimized src={chevronlefticon} alt="hh" />
                    }
                    firstPageText={
                      <Image unoptimized src={doublearrowleft} alt="hh" />
                    }
                    lastPageText={
                      <Image unoptimized src={doublearrowright} alt="hh" />
                    }
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </li>
              </ul>
              <span className="text-gray f-14">
                Showing {(currentPage - 1) * limit + 1} to
                {currentPage * limit} of {pageCount}
              </span>
            </div>
          ) : (
            ""
          )} */}
        </div>
        {testimonialInfo?.length === 0 && <p>No Testimonials Found</p>}

        <Modal
          isOpen={modalIsOpenDelete}
          onRequestClose={closeModalDelete}
          style={customStyles}
        >
          <p className="text-center">Are you sure you want to delete ?</p>
          <div className="modal-btn flex justify-center mt-6 gap-1">
            <button
              className="primary-bg p-4 text-white btn-add font-semibold"
              onClick={() => {
                deleteTestominial();
              }}
            >
              Yes
            </button>
            <button
              className="white-bg p-4 text-gray primay-bg-500 btn-add font-semibold"
              onClick={closeModalDelete}
            >
              No
            </button>
          </div>
        </Modal>

        {/* add testimonial modal  */}
      </div>
    </>
  );
};

export default Testimonials;
