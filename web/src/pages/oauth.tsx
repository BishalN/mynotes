import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

function oauth() {
  //This page is responsible for redirecting the user to the dashboard if the user supplies the proper token
  //as the query params
  const router = useRouter();
  useEffect(() => {
    if (router.query.token) {
      //save it to the local storage
      localStorage.setItem("token", JSON.stringify(router.query.token));
      router.push("/dash");
    } else {
      //redirect back to login page
      router.push("/");
    }
  }, [router.query.token]);
  return <div>Redirecting</div>;
}

export default oauth;
