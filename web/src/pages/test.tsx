import axios from "axios";
import React, { useEffect } from "react";

function test() {
  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((dat) => console.log(dat))
      .catch((err) => console.log(err));
  });
  return <div>bad</div>;
}

export default test;
