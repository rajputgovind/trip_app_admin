import React from "react";
import EditTestimonials from "./EditTestimonials";

const index = ({id,state}) => {
  return (
    <div>
      <EditTestimonials id={id} state={state} />
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
 
  let { id, state } = context.query;
  return {
    props: {
      id: id ? id : "",
      state: state ? state : "",
    },
  };
}
