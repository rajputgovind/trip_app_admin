import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import searchIcon from "../public/search-icon.svg";

import cookie from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Pagination from "react-js-pagination";
import chevronrighticon from "../public/chevron-right-icon.svg";
import chevronlefticon from "../public/chevron-left-icon.svg";
import doublearrowleft from "../public/double-arrow-left.svg";
import doublearrowright from "../public/double-arrow-right.svg";
import closeIcon from "../public/close-icon.svg";
import Modal from "react-modal";
import {
  getAllUsers,
  deleteUserOrganizerFunction,getAllUsersDownload
} from "../components/apiservice";
import { BsFillEyeFill, BsFillChatDotsFill } from "react-icons/bs";
import commonFunction from "../commonFunctions/dateTime";

import XLSX from 'sheetjs-style';
import FileSaver, * as fileSaver from 'file-saver'
const User = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setuserInfo] = useState([]);
  
  const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
  const [modalIsOpenDelete, setIsOpenDelete] = React.useState(false);
  const [isLoading, setLoaderState] = useState(false);
  const [limit, setLimit] = useState();
  const [pageCount, setPageCount] = useState();
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [deleteUserId, setDeleteUserId] = useState();
 
  const [downloadData,setdownloadData]=useState([])

  function closeModalEdit() {
    setIsOpenEdit(false);
  }

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
  const deleteFunction = () => {
    let token = cookie.get("token");
    if (token) {
      setIsOpenDelete(true);
    } else {
      router.push("/login-page");
    }
  };
  const deleteUser = () => {
    let token = cookie.get("token");
    if (token) {
      deleteUserOrganizerFunction(
        token,
        setLoaderState,
        deleteUserId,
        "user",
        router,
        setuserInfo,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord,
        setIsOpenDelete,
        setdownloadData
      );
    } else {
      router.push("/login-page");
    }
  };
  const searchKeyboard = () => {
    let token = cookie.get("token");
    if (token) {
     
      getAllUsers(
        token,
        setLoaderState,
        router,
        setuserInfo,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord,
        false
      
     
      );
    } else {
      router.push("/login-page");
    }
  };
  useEffect(() => {
    let token = cookie.get("token");

    if (token) {
      getAllUsers(
        token,
        setLoaderState,
        router,
        setuserInfo,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord,
        false
       
      );
    } else {
      router.push("/login-page");
    }
  }, [currentPage, searchKeyWord]);
  const downloadCSv=()=>
  {
   
      const fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-utf-8";
      const fileExtension='.xlsx';
      const ws=XLSX.utils.json_to_sheet(downloadData)
    const wb={Sheets:{'data':ws},SheetNames:['data']}
    const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'})
    const data=new Blob([excelBuffer],{type:fileType})
    FileSaver.saveAs(data,`UsersList+${fileExtension}`)

  }

  useEffect(()=>
  {let token = cookie.get("token");

  if (token) {
    getAllUsersDownload( token,
      setLoaderState,
      router,
      setdownloadData)
    }
    else
    {
      router.push("/login-page")
    }
  },[])
  return (
    <div className="main-content-box" data-testid="result">
      <div className="flex-text text-left heading text-xl mb-4">
        <span>Manage Users</span>

        <div className="flex justify-center">
          <div className="">
            <div className="search-box input-group relative flex flex-wrap items-stretch w-full bg-white border-gray-300 rounded border-solid border">
              <input
                type="search"
                name="search"
                className="search-input form-control relative flex-auto min-w-0 px-3 py-1.5 text-base font-normal text-gray-300  bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                placeholder="Search by Name"
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
                  <span> Name </span>
                </span>
              </td>
              <td scope="col" className="py-3 px-2">
                <span className="flex-heading">
                  <span> Email </span>
                </span>
              </td>
              <td scope="col" className="py-3 px-2">
                Phone
              </td>
              <td scope="col" className="py-3 px-2">
                Date Of Birth
              </td>
              <td scope="col" className="py-3 px-6 text-right">
                Action
              </td>
            </tr>
          </thead>
          <tbody className="text-gray">
            {userInfo?.map((user) => {
              return (
                <tr className="bg-white border-b " key={user?._id}>
                  <td className="py-4 px-6">{user?.name ? user?.name : "-"}</td>
                  <td className="py-4 px-2">
                    {user?.email ? user?.email : "-"}
                  </td>
                  <td className="py-4 px-2">
                    {user?.phone ? user?.phone : "-"}
                  </td>

                  <td className="py-4 px-2">
                    {user?.birthDate ? commonFunction(user?.birthDate) : "-"}
                  </td>

                  <td className="py-4 px-6 text-right">
                    {/* <button
                      onClick={() => {
                        setIsOpenEdit(true);
                      }}
                    >
                      <BsFillEyeFill />
                    </button>
                    <button onClick={() => {}}>
                      <i className="fa-solid fa-pen-to-square fa-sm edit-cat text-right"></i>
                    </button> */}
                    <button
                      onClick={() => {
                        setDeleteUserId(user?._id);
                        deleteFunction();
                      }}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className="download-btn">
        <button type="button" className="excel--btn edit--btn" onClick={()=>
        {
          downloadCSv()
        }}>Download in Excel Format</button>
</div>
        {userInfo?.length > 0 ? (
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
      </div>
      {userInfo?.length === 0 && <p>User Not found</p>}
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={closeModalEdit}
        style={customStyles}
      >
        <p className="flex-text text-left text-gray-700 text-xl mb-4">
          <span className="flex item-center gap-1 ">User Information</span>
          <div className="flex justify-center">
            <Image
              unoptimized
              onClick={closeModalEdit}
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            disabled
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Email
          </label>
          <input
            type="email"
            className="basis-2/3
          form-control f-14 border-10
          px-3
          py-2
          text-gray
          bg-white bg-clip-padding
          border border-solid border-gray-300
          shadow-sm
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            disabled
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Phone
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            disabled
          />
        </div>

        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            City
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            disabled
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Zipcode
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            disabled
          />
        </div>
        <div className="mb-3 flex items-center gap-1">
          <label for="" className="form-label inline-block basis-1/3">
            Department
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            disabled
          />
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
              deleteUser();
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
