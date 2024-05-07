import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Profile from "./[Profile]";
import cookie from "js-cookie";
import { toast } from "react-toastify";
function Index(data) {

  const router = useRouter();

  return (
    <>
      <Profile profileState={data?.profileState} setProfileState={data?.setProfileState}/>
    </>
  );
}

export default Index;
