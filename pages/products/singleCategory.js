import React, { useState } from "react";
import "react-responsive-modal/styles.css";

import { useRouter } from "next/router";

import commonFunction from "../../commonFunctions/dateTime";
import deleteicon from "../../public/delete-icon.svg";
import Image from "next/image";
import Modal from "react-modal";
import closeIcon from "../../public/close-icon.svg";
import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RiDeleteBin6Fill } from "react-icons/ri";

function SingleCategory() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setLoaderState] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [white, setWhite] = useState();
  const [selectedWhiteImage, setSelectedWhiteImage] = useState();
  const [id, setId] = useState();
  const [userName, setUserName] = useState();
  const [userPrice, setUserPrice] = useState();
  const [imageIcon, setImageIcon] = useState();
  const [editModule, setEditModule] = useState(false);
  const [type, setType] = useState("common");
  const router = useRouter();
  const [typeEdit, setEditType] = useState();
  const [imageSecondIcon, setImageSecondIcon] = useState();
  const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteCat, setDeleteCat] = useState();
  const [sortingOrder, setSortingOrder] = useState();
  const [description, setDescription] = useState();

  function closeModalEdit() {
    setIsOpenEdit(false);
  }
  function closeEdit() {
    setEditModule(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "630px",
      overflow: "hidden",
      color: "black",
    },
  };

  const getAddButton = () => {
    setEditModule(true);
  };
  function closeModalDelete() {
    setIsOpenDelete(false);
  }
  function openModalDelete() {
    setIsOpenDelete(true);
  }

  return (
    <div>
      <div className="main-content-box" data-testid="FundDepositeView">
        <div className="flex-text text-left heading text-xl mb-4">
          <span>Organizer Details </span>
        </div>
        <hr className="mt-6 mb-6" />
        <div className="table-white shadow-sm mb-1rem ">
          <table className="user-table w-full text-sm text-left ">
            <tbody className="text-gray">
              <tr className=" border-b ">
                <td scope="row" className="bg-white">
                  <img height="200" width="200" src="" />
                </td>
                <td scope="row" className="bg-white">
                  <p className="text-dark f-16 mb-2">user Name</p>
                </td>

                <td className=" text-right bg-white">
                  <p className=" mb-2">
                    <b>Created at :</b>
                    12/12/23
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="main-content-box" data-testid="result">
          <div className="flex-text text-left text-gray-700 text-xl mb-4">
            <span>Product</span>
            <div className="flex justify-center gap-1">
              <div className="flex justify-center gap-1">
                <div>
                  <button
                    onClick={() => {
                      getAddButton();
                    }}
                    className="primary-bg text-white btn-add p-2"
                  >
                    + Add Product
                  </button>
                </div>
              </div>
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
          <div className="">
            <table className="user-table w-full text-sm text-left ">
              <thead className="text-gray">
                <tr className=" border-b ">
                  <td scope="col" className="py-3 px-6">
                    <span className="flex-heading">
                      <span>Order No.</span>
                    </span>
                  </td>

                  <td scope="col" className="py-3 px-6">
                    <span className="flex-heading">
                      <span>Image</span>
                    </span>
                  </td>
                  <td scope="col" className="py-3 px-6">
                    <span className="flex-heading">
                      <span> Name </span>
                    </span>
                  </td>
                  <td scope="col" className="py-3 px-6">
                    <span className="flex-heading">
                      <span> Price </span>
                    </span>
                  </td>
                  <td scope="col" className="py-3 px-6 text-right">
                    Action
                  </td>
                </tr>
              </thead>

              <tbody className="text-gray">
                <tr className="bg-white border-b ">
                  <td className="py-4 px-6">1</td>

                  <td className="py-4 px-2 ">
                    <img height="auto" width="40px" src="" />
                  </td>
                  <td className="py-4 px-6">User Name</td>
                  <td className="py-4 px-6">123€ </td>
                  <td className="py-4 px-6 text-right">
                    <button>
                      <i
                        className="fa-solid fa-pen-to-square fa-sm edit-cat"
                        onClick={() => {
                          setIsOpenEdit(true);
                        }}
                      ></i>
                    </button>
                    <button>
                      <Image
                        onClick={() => {
                          openModalDelete();
                        }}
                        unoptimized
                        alt="delete"
                        src={deleteicon}
                      />
                    </button>
                  </td>
                </tr>

                <tr className="bg-white border-b ">
                  <td className="py-4 px-6">12</td>
                  <td className="py-4 px-2 ">
                    <img height="40" width="40" src="" />
                  </td>
                  <td className="py-4 px-6">userName</td>
                  <td className="py-4 px-6">324€ </td>
                  <td className="py-4 px-6 text-right">
                    <button>
                      <i
                        className="fa-solid fa-pen-to-square fa-sm edit-cat"
                        onClick={() => {
                          setIsOpenEdit(true);
                        }}
                      ></i>
                    </button>
                    <button>
                      <RiDeleteBin6Fill
                        onClick={() => {
                          openModalDelete();
                        }}
                      />
                    </button>
                  </td>
                </tr>

                <tr className="bg-white border-b ">
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-2 ">
                    <img height="40" width="40" src="" />
                  </td>
                  <td className="py-4 px-6">Name</td>
                  <td className="py-4 px-6">123€ </td>
                  <td className="py-4 px-6 text-right">
                    <button>
                      <i
                        className="fa-solid fa-pen-to-square fa-sm edit-cat"
                        onClick={() => {
                          setIsOpenEdit(true);
                        }}
                      ></i>
                    </button>
                    <button>
                      <Image
                        onClick={() => {
                          openModalDelete();
                        }}
                        unoptimized
                        alt="delete"
                        src={deleteicon}
                      />
                    </button>
                  </td>
                </tr>

                <tr className="bg-white border-b ">
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-2 ">
                    <img height="40" width="40" src="" />
                  </td>
                  <td className="py-4 px-6">user Name</td>
                  <td className="py-4 px-6">123€ </td>
                  <td className="py-4 px-6 text-right">
                    <button>
                      <i
                        className="fa-solid fa-pen-to-square fa-sm edit-cat"
                        onClick={() => {
                          setIsOpenEdit(true);
                        }}
                      ></i>
                    </button>
                    <button>
                      <Image
                        onClick={() => {
                          openModalDelete();
                        }}
                        unoptimized
                        alt="delete"
                        src={deleteicon}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Products */}
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={closeModalEdit}
        style={customStyles}
      >
        <p className="flex-text text-left text-gray-700 text-xl mb-4">
          <span className="flex item-center gap-1 ">
            <span>Edit Product </span>
          </span>
          <div className="flex justify-center">
            <Image
              unoptimized
              onClick={closeModalEdit}
              className="cursor-pointer"
              alt="close"
              src={closeIcon}
              // user_meta
            />
          </div>
        </p>
        <hr className="mt-6 mb-6" />
        {/* <form> */}
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Order No.
          </label>
          <input
            type="text"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none -ml-1
      "
          />
        </div>

        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Name
          </label>
          <input
            type="text"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none -ml-1
      "
          />
        </div>

        <div className="mb-3 flex items-center ">
          <label for="" className="form-label inline-block basis-1/3">
            Price
          </label>
          <input
            type="number"
            className="basis-2/3
          form-control f-14 border-10 ml-3
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm 
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          />
        </div>

        <div className="label-types mb-3">
          <label className="form-label inline-block basis-1/3" for="cars">
            Type:
          </label>
          <select
            className="basis-2/3
form-control f-14 border-10 ml-3
pr-3 pl-2
py-2
text-gray
bg-white bg-clip-padding
border border-solid border-gray-300
shadow-sm 
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
            id="cars"
          >
            <option value="common">Common </option>
            <option value="surface">Superficie</option>
            <option value="exterior">Extérieur</option>
            <option value="apartmentType">Type d&lsquo;appartement </option>
          </select>
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Description
          </label>
          <textarea
            type="text"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none -ml-1
      "
          />
        </div>
        <div className="modalbox--product">
          <div className="brown-img-box">
            <h5>Dark Image</h5>
            {/* {image ? (
              <div className="cat-img-size">
                {" "}
                <img width="40px" height="40px" src={image} />{" "}
              </div>
            ) : !image && selectedImage ? (
              <div className="uploaded-img--2">
                <img
                  width="40px"
                  height="auto"
                  src={URL?.createObjectURL(selectedImage)}
                />
              </div>
            ) : (
              ""
            )} */}
            <input
              className="mt-3"
              type="file"
              onChange={(e) => {
                setImage(null);
                setSelectedImage(e.target.files[0]);
              }}
            />
          </div>

          <div className="white-img-box">
            <h5>Light Image</h5>

            {/* {white ? (
              <div className="cat-img-size">
                <img width="40px" height="40px" src={white} />
              </div>
            ) : !white && selectedWhiteImage ? (
              <div className="uploaded-img--2">
                <img
                  width="40px"
                  height="auto"
                  src={URL?.createObjectURL(selectedWhiteImage)}
                />
              </div>
            ) : (
              ""
            )} */}
            <input
              className="mt-3"
              type="file"
              onChange={(e) => {
                setWhite(null);
                setSelectedWhiteImage(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className="img-update--btn p-3">
          <button
            type="button"
            className="primary-bg p-4 text-white btn-add font-semibold"
            // onClick={() => {
            //   imageChange(id, selectedImage, selectedWhiteImage);
            // }}
          >
            Image update
          </button>
        </div>

        <hr className="mt-3" />
        <div className="modal-btn flex justify-between mt-6">
          <button
            type="button"
            className="primary-bg p-4 text-white btn-add font-semibold"
          >
            Save
          </button>
          <button
            className="white-bg p-4 primary-text btn-add font-semibold"
            type="button"
            onClick={closeModalEdit}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Add Products */}
      <Modal
        isOpen={editModule}
        onRequestClose={closeModalEdit}
        style={customStyles}
      >
        <p className="flex-text text-left text-gray-700 text-xl mb-4">
          <span className="flex item-center gap-1 ">
            <span>Add Product</span>
          </span>

          <div className="flex justify-center">
            <Image
              unoptimized
              onClick={closeEdit}
              className="cursor-pointer"
              alt="close"
              src={closeIcon}
            />
          </div>
        </p>
        <hr className="mt-6 mb-6" />
        {/* <form> */}
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Name
          </label>
          <input
            type="text"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none -ml-1
      "
          />
        </div>

        <div className="mb-3 flex items-center ">
          <label for="" className="form-label inline-block basis-1/3">
            Price
          </label>

          <input
            type="number"
            className="basis-2/3
            form-control f-14 border-10 ml-3
            px-3
            py-2
            text-gray
            bg-white bg-clip-padding
            border border-solid border-gray-300
            shadow-sm 
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          />
        </div>

        <div className="label-types mb-3">
          <label className="form-label inline-block basis-1/3" for="cars">
            Type:
          </label>
          <select
            className="
        basis-2/3
form-control f-14 border-10 ml-3
pr-3 pl-2
py-2
text-gray
bg-white bg-clip-padding
border border-solid border-gray-300
shadow-sm 
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none 
        "
            name="cars"
            id="cars"
          >
            <option value="common">Common </option>
            <option value="surface">Superficie</option>
            <option value="exterior">Extérieur</option>
            <option value="apartmentType">Type d&lsquo;appartement </option>
          </select>
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Description
          </label>
          <textarea
            type="text"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none -ml-1
      "
          />
        </div>

        <div className="modalbox--product-1">
          <div className="brown-img-box-1">
            <h5>Brown Image</h5>

            {/* {imageSecondIcon && (
              <div className="uploaded-img--2">
                <img
                  width="40px"
                  height="auto"
                  src={URL?.createObjectURL(imageSecondIcon)}
                />
              </div>
            )} */}

            <input
              className="mt-3"
              accept=".svg"
              type="file"
              onChange={(e) => {
                setImageSecondIcon(e.target.files[0]);
              }}
              onClick={(e) => {
                e.target.value = null;
              }}
            />
          </div>

          <div className="white-img-box-1">
            <h5>White Image</h5>
            {/* {imageIcon && (
              <div className="uploaded-img--2">
                <img
                  width="40px"
                  height="auto"
                  src={URL?.createObjectURL(imageIcon)}
                />
              </div>
            )} */}

            <input
              className="mt-3"
              accept=".svg"
              type="file"
              onChange={(e) => {
                setImageIcon(e.target.files[0]);
              }}
              onClick={(e) => {
                e.target.value = null;
              }}
            />
          </div>
        </div>

        <hr className="mt-3" />
        <div className="modal-btn flex justify-between mt-6">
          <button
            type="button"
            className="primary-bg p-4 text-white btn-add font-semibold"
          >
            Add Product
            {loading && <div className="loader loader-img"></div>}
          </button>
          <button
            className="white-bg p-4 primary-text btn-add font-semibold"
            type="button"
            onClick={() => {
              closeEdit();
            }}
          >
            Cancel
          </button>
        </div>
        {/* </form> */}
      </Modal>

      {/* Delet Product */}
      <Modal
        isOpen={modalIsOpenDelete}
        onRequestClose={closeModalDelete}
        style={customStyles}
      >
        <p className="text-center">Are you sure you want to delete ?</p>
        <div className="modal-btn flex justify-center mt-6 gap-1">
          <button className="primary-bg p-4 text-white btn-add font-semibold">
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
    </div>
  );
}

export default SingleCategory;
