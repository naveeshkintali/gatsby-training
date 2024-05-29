import { navigate } from "gatsby";
import React from "react";

function logout() {
  localStorage.removeItem("jwt");
  navigate("/login");
  return <div></div>;
}

export default logout;
