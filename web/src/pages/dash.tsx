import React from "react";
import { useIsAuth } from "../hooks/utils/useIsAuth";

const Dash = () => {
  useIsAuth();
  return <div>Welcome to the dash page</div>;
};

export default Dash;
