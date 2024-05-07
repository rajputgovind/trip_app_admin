import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

const SettingTabs = () => {
  return (
    <>
      <div className="main-content-box">
        <div className="setting-content">
          <div className="flex heading text-xl setting-txt">
            Settings
            <AiOutlineEdit className="cursor-pointer" />
          </div>
        </div>

        <hr className="mt-6 mb-6" />

        <div className="container mx-auto">
          {/* <div className="flex-container flex-wrap justify-between grid gap-1 mb-5">
            <div className="w-full">
              <div className=" manage-setting-width">
                <div className="table text-gray">
                  <table className="user-table w-full text-sm text-left ">
                    <tbody className="settings-table">
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6"> Group Type</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          
                          <label class="toggle">
                            <input type="checkbox" />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">Trip Type</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          
                          <label class="toggle">
                            <input type="checkbox" />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">Country</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          
                          <label class="toggle">
                            <input type="checkbox" />
                            <span class="slider"></span>
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <h1>hii</h1>
            </div>
            <div className="">05</div>
            <div className="">06</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingTabs;
