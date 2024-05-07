import React from "react";
import Index from "../../components/SingleTrip";
import axios from "axios";
const index = (data) => {
  return (
    <>
      <Index trips={data?.data?.data} />
    </>
  );
};
export async function getServerSideProps(context) {
  const access_token = context.req.cookies.apitoken;

  const id = context.params.tripInfo;

  try {
    if (id) {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${id}`
      );
      // const reviewDetails = data?.review;

      return {
        props: {
          data: data?.data,
        },
      };
    } else {
      return {
        props: {
          data: "",
        },
      };
    }
  } catch (err) {
    return {
      props: {},
    };
  }
}
export default index;
