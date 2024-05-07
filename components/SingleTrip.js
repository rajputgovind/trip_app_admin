import React from "react";
import parse from "html-react-parser";
import dateTime from "../commonFunctions/dateTime";
export default function SingleTrip({ trips }) {
  return trips?.map((tripInfo) => {
    return (
      <div className="container main-content-box" key={tripInfo?._id}>
        <div className="creator-main-box">
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Contact Name</h1>
            <p>{tripInfo?.contactName}</p>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Contact Email</h1>
            <p>{tripInfo?.contactEmail}</p>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Contact Phone Number</h1>
            <p>{tripInfo?.contactPhone}</p>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip Name</h1>
            <p>{tripInfo?.tripName}</p>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Country Name</h1>
            <p>{tripInfo?.country}</p>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip date</h1>
            <p>{dateTime(tripInfo?.tripDate)}</p>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip duration</h1>
            <p>{tripInfo?.tripDuration}</p>
          </div>
          <div className="  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip includes :</h1>
            <br />
            {tripInfo?.tripIncludes && parse(tripInfo?.tripIncludes)}
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip price</h1>
            <p>{tripInfo?.tripPrice} </p>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip type</h1>
            <p>{tripInfo?.tripType}</p>
          </div>
          <div className="  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Terms And Conditions :</h1>
            <br />
            {tripInfo?.termAndConditions && parse(tripInfo?.termAndConditions)}
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip Active</h1>
            {tripInfo?.tripStatus ? "Yes" : "No"}
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Main trip image</h1>
            <div className="creator-img-box">
              {!tripInfo?.mainTripImage ? (
                <span>-</span>
              ) : (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripImages/${tripInfo?.mainTripImage}`}
                />
              )}
            </div>
          </div>
          <div className="details-info  bg-white  p-3 mb-3 rounded-lg">
            <h1 className="text-gray">Trip Logo</h1>
            <div className="creator-img-box">
              {!tripInfo?.tripLogo ? (
                <span>-</span>
              ) : (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGES}/public/tripImages/${tripInfo?.tripLogo}`}
                />
              )}
            </div>
          </div>
          <div className="destination-creator-box p-3 rounded-lg">
            <p className="font-bold text-gray p-3">Destination</p>
            {tripInfo?.destination?.map((reached) => {
              return (
                <div
                  className="destination-boxes bg-white rounded-lg mb-3"
                  key={reached?._id}
                >
                  <div className="destination-sub-box mb-3">
                    <p className="text-gray">City</p>
                    <p>{reached?.city}</p>
                  </div>
                  <div className="destination-sub-box mb-3">
                    <p className="text-gray">Destination Date</p>
                    <p>{dateTime(reached?.destinationDate)}</p>
                  </div>
                  <div className="destination-sub-box mb-3">
                    <p className="text-gray">Destination Duration</p>
                    <p>{reached?.duration}</p>
                  </div>
                  <div className="destination-data mb-3">
                    <p className="text-gray">Agenda :</p>
                    {/* <br /> */}
                    {reached?.agenda && parse(reached?.agenda)}
                  </div>

                  <div className="destination-sub-box mb-3">
                    <p className="text-gray">Destination Image</p>
                    <div className="destination-img--content">
                      _
                      {reached?.destinationImage?.map((destination) => {
                        return (
                          <div
                            className="creator-img-box"
                            key={destination?._id}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGES}/public/destinationImages/${destination}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="destination-sub-box mb-3">
                    <p className="text-gray">Created At</p>
                    <p>{dateTime(reached?.createdAt)}</p>
                  </div>
                  <div className="destination-sub-box mb-3">
                    <p className="text-gray">Hotel Name</p>
                    <p>{reached?.hotelName}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="p-3 font-bold text-gray mb-3">Documents</p>
          <div className="document-container p-3 rounded-lg">
            <div className="check-list--container">
              <ul>
                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.firstName
                        ? tripInfo?.document?.firstName
                        : false
                    }
                  />
                  <p className="txt-test">First name</p>
                </li>

                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.lastName
                        ? tripInfo?.document?.lastName
                        : false
                    }
                  />
                  <p className="txt-test">Last name</p>
                </li>

                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.age ? tripInfo?.document?.age : false
                    }
                  />
                  <p className="txt-test"> Age</p>
                </li>
                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.phone
                        ? tripInfo?.document?.phone
                        : false
                    }
                  />
                  <p className="txt-test"> phone Number</p>
                </li>
              </ul>

              <ul>
                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.gender
                        ? tripInfo?.document?.gender
                        : false
                    }
                  />
                  <p className="txt-test"> Gender</p>
                </li>
                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.passport
                        ? tripInfo?.document?.passport
                        : false
                    }
                  />
                  <p className="txt-test"> Special Requests</p>
                </li>

                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.healthIssues
                        ? tripInfo?.document?.healthIssues
                        : false
                    }
                  />
                  <p className="txt-test"> Health issues</p>
                </li>

                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.id ? tripInfo?.document?.id : false
                    }
                  />
                  <p className="txt-test"> ID</p>
                </li>
                <li>
                  <input
                    type="checkbox"
                    className="test-check"
                    checked={
                      tripInfo?.document?.email
                        ? tripInfo?.document?.email
                        : false
                    }
                  />
                  <p className="txt-test"> Email</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  });
}
