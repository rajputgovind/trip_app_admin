import "../styles/globals.css";
import Layout from "../components/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [profileState,setProfileState]=useState(false)
  return (
    <>
      <ToastContainer />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        ></link>
      </Head>

      <Layout profileState={profileState}>
        <Component {...pageProps} profileState={profileState} setProfileState={setProfileState}/>
      </Layout>
    </>
  );
}

export default MyApp;
