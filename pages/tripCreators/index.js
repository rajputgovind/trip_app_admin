import React, { useEffect } from "react";
import TripCreator from "../../components/tripInfo";
import axios from "axios";
import { useRouter } from "next/router";
const Index = (data) => {
  const router = useRouter();

  return (
    <div>
      <TripCreator />
    </div>
  );
};

export default Index;
