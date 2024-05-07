import React, { useEffect, useState } from "react";

import Image from "next/image";
import cookie from "js-cookie";
import { useRouter } from "next/router";

import closeIcon from "../public/close-icon.svg";
import Modal from "react-modal";
import Select from "react-select";
import {
  getAllTrips,
  toggleChangeFunctionTrips,
  deleteTripData,
} from "./apiservice";
import Pagination from "react-js-pagination";
import chevronrighticon from "../public/chevron-right-icon.svg";
import chevronlefticon from "../public/chevron-left-icon.svg";
import doublearrowleft from "../public/double-arrow-left.svg";
import doublearrowright from "../public/double-arrow-right.svg";
import searchIcon from "../public/search-icon.svg";
import { BsFillEyeFill } from "react-icons/bs";
import { Countries } from "../country";
import { RiDeleteBin6Fill } from "react-icons/ri";
const User = () => {
  const router = useRouter();

  const [isLoading, setLoaderState] = useState(false);

  const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);

  const [tripData, setTripData] = useState([]);
  const [limit, setLimit] = useState();
  const [pageCount, setPageCount] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const optionsPrice = [
    { value: "5000-10000", label: "5000-10000SAR" },
    { value: "10000-15000", label: "10000-15000SAR" },
    { value: "15000-20000", label: "15000-20000SAR" },
    { value: "20000-25000", label: "20000-25000SAR" },
  ];
  const optionsDuration = [
    { value: "One week", label: "One Week" },
    { value: "Two week", label: "Two Week" },
    { value: "Month", label: "Month" },
    { value: "More than a month", label: "more than Month" },
  ];
  const optionstripType = [
    { value: "Tourism", label: "Tourism" },
    { value: "Hunting", label: "Hunting" },
    { value: "Therapeutic", label: "Therapeutic" },
    { value: "Training", label: "Training" },
    { value: "Educational", label: "Educational" },
  ];
  const optionsgroupType = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Families", label: "Families" },
    { value: "Students", label: "Students" },
  ];
  const [modalIsOpenDelete, setIsOpenDelete] = React.useState(false);
  const [selectedOptionType, setselectedOptionType] = useState("");
  const [selectedOptionGroupType, setselectedOptionGroupType] = useState("");
  const [countryType, setCountryType] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [deleteOrganizerId, setDeleteOrganizerId] = useState();
  function closeEdit() {
    setIsOpenEdit(false);
  }
  function closeModalDelete() {
    setIsOpenDelete(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
    },
  };
  const customStyleForm = {
    // Custom styles for the control container
    control: (provided, state) => ({
      ...provided,
      width: "300px", // Set the desired width of the select container
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: state.isFocused ? "none" : null, // Remove the boxShadow on focus
      "&:hover": {
        borderColor: "#ccc", // No color change on hover
      },
    }),

    // Custom styles for the option container
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "#f0f0f0" : "none", // Set a background color for selected option
      color: state.isSelected ? "#333" : "#666", // Set text color for selected option
      "&:hover": {
        background: "#DBAE9C", // No color change on option hover
      },
    }),
  };
  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
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
    } else {
      router.push("/login-page");
    }
  }, [
    currentPage,
    searchKeyWord,

    selectedOptionType,
    selectedOptionGroupType,
    selectedCountry,
  ]);
  const searchKeyboard = () => {
    let token = cookie.get("token");
    if (token) {
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
        setIsOpenDelete
      );
    }
  };
  useEffect(() => {
    const optionData = Countries?.map((country) => {
      return {
        value: country?.name,
        label: country?.name,
      };
    });
    setCountryType(optionData);
  }, []);
  const toggleChangeData = (id, status) => {
    let token = cookie.get("token");
    if (token) {
      toggleChangeFunctionTrips(
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
      );
    } else {
      router.push("/login-page");
    }
  };
  const deleteFunction = () => {
    let token = cookie.get("token");
    if (token) {
      setIsOpenDelete(true);
    } else {
      router.push("/login-page");
    }
  };
  const deleteTrip = () => {
    let token = cookie.get("token");
    if (token) {
      deleteTripData(
        token,
        setLoaderState,
        router,
        setTripData,
        tripData,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord,
        deleteOrganizerId,
        selectedOptionType,
        selectedOptionGroupType,
        selectedCountry,
        setIsOpenDelete
      );
    } else {
      router.push("/login-page");
    }
  };
  return (
    <div className="main-content-box" data-testid="result">
      <div className="flex-text text-left heading text-xl mb-4">
        <span>Trip Creator Information</span>
        <div className="flex justify-center">
          <div className="">
            <div className="search-box input-group relative flex flex-wrap items-stretch w-full bg-white border-gray-300 rounded border-solid border">
              <input
                type="search"
                name="search"
                className="search-input form-control relative flex-auto min-w-0 px-3 py-1.5 text-base font-normal text-gray-300  bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder="Search by Name or Email"
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchKeyWord(e.target.value);
                }}
              />
              <button
                className="btn inline-block px-3 py-2.5 text-gray-500 font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0   transition duration-150 ease-in-out flex items-center"
                type="button"
                id="button-addon2"
                onClick={() => {
                  searchKeyboard();
                }}
              >
                <Image unoptimized alt="search" src={searchIcon} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className=""></div>
        </div>
      </div>
      <div className="flex gap-10  flex-wrap">
        {/* <div className="select-user-adminbox  mb-4">
          <Select
            isClearable
            options={optionsPrice}
            styles={customStyleForm}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setCurrentPage(1);
                setSelectedPrice(selectedOption.value);
              } else {
                setSelectedPrice("");
                setCurrentPage(1);
              }
            }}
            placeholder="Price"
          />
        </div>
        <div className="select-user-adminbox">
          <Select
            isClearable
            options={optionsDuration}
            styles={customStyleForm}
            placeholder="Duration"
            onChange={(selectedOption) => {
              if (selectedOption) {
                setCurrentPage(1);
                setSelectedDuration(selectedOption.value);
              } else {
                setSelectedDuration("");
                setCurrentPage(1);
              }
            }}
          />
        </div> */}
        <div className="select-user-adminbox">
          <Select
            isClearable
            options={optionstripType}
            styles={customStyleForm}
            placeholder="Trip Type"
            onChange={(selectedOption) => {
              if (selectedOption) {
                setCurrentPage(1);
                setselectedOptionGroupType(selectedOption.value);
              } else {
                setselectedOptionGroupType("");
                setCurrentPage(1);
              }
            }}
          />
        </div>
        <div className="select-user-adminbox">
          <Select
            isClearable
            options={optionsgroupType}
            styles={customStyleForm}
            placeholder="Group Type"
            onChange={(selectedOption) => {
              if (selectedOption) {
                setCurrentPage(1);
                setselectedOptionType(selectedOption.value);
              } else {
                setselectedOptionType("");
                setCurrentPage(1);
              }
            }}
          />
        </div>
        <div className="select-user-adminbox  mb-4">
          <Select
            isClearable
            options={countryType}
            styles={customStyleForm}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setCurrentPage(1);
                setSelectedCountry(selectedOption.value);
              } else {
                setSelectedCountry("");
                setCurrentPage(1);
              }
            }}
            placeholder="Country"
          />
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
                  <span> Name </span>
                </span>
              </td>
              <td scope="col" className="py-3 px-2">
                <span className="flex-heading">
                  <span> Email</span>
                </span>
              </td>
              <td scope="col" className="py-3 px-2">
                Phone Number
              </td>
              <td scope="col" className="py-3 px-6 text-right">
                HomePage Visibility
              </td>
              <td scope="col" className="py-3 px-6 text-right">
                Action
              </td>
            </tr>
          </thead>

          <tbody className="text-gray">
            {tripData?.map((trip) => {
              return (
                <tr className="bg-white border-b " key={trip?._id}>
                  <td className="py-4 px-6">
                    {trip?.user?.name ? trip?.user?.name : "-"}
                  </td>
                  <td className="py-4 px-2">
                    {trip?.user?.email ? trip?.user?.email : "-"}
                  </td>
                  <td className="py-4 px-2">
                    {trip?.user?.phone ? trip?.user?.phone : "-"}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <label class="toggle">
                      <input
                        type="checkbox"
                        checked={trip?.tripVisibility ? true : false}
                        onChange={(e) => {
                          toggleChangeData(trip?._id, !trip?.tripVisibility);
                        }}
                      />
                      <span class="slider"></span>
                    </label>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => {
                        router.push(`/tripCreators/${trip?._id}`);
                      }}
                    >
                      <BsFillEyeFill />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteOrganizerId(trip?._id);
                        deleteFunction();
                      }}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                  {/* <td className="py-4 px-6 text-right">
                   
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {tripData?.length > 0 ? (
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
      )}
      {tripData?.length === 0 && <p>Trip not found</p>}
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={closeEdit}
        style={customStyles}
      >
        <p className="flex-text text-left text-gray-700 text-xl mb-4">
          <span className="flex item-center gap-1 ">
            <span>Edit Plans</span>
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
          />
        </div>

        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Original Price
          </label>
          <input
            type="number"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Discounted Price
          </label>
          <input
            type="number"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>

        <h6>Plan Features</h6>
        {/* <Select
          value={selectedOptions}
          options={options}
          onChange={(e) => {
            let dataId = e.map((data) => {
              return {
                value: data.value,
                label: data.label,
              };
            });
            setSelectedOptions(dataId);
          }}
          isMulti
        /> */}
        <div className="modal-btn flex justify-end mt-6">
          <button
            type="button"
            className="primary-bg p-4 text-white btn-add font-semibold"
          >
            Edit Plan
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
      </Modal>
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
              deleteTrip();
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
    </div>
  );
};

export default User;
