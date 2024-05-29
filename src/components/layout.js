import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Navbar from "./navbar";
import axios from "axios";
const Layout = ({ children }) => {
  const [authenticated, setAuthenticated] = useState();
  useEffect(() => {
    // const jwtToken = localStorage.getItem("jwt");
    let jwtToken;
    if (typeof window !== "undefined") {
      jwtToken = localStorage.getItem("jwt");
      if (!jwtToken) {
        navigate("/");
      } else {
        axios
          .get("http://localhost:1337/api/users/me", {
            headers: {
              Authorization: `Bearer  ${jwtToken}`,
            },
          })
          .then((response) => {
            setAuthenticated(true);
          })
          .catch((error) => {
            console.log(error.messgae);
          });
      }
    }
  });
  return (
    <div>
      <Navbar />
      <hr />
      <main>{authenticated && children}</main>
      <hr />
      <footer>This is a footer</footer>
    </div>
  );
};

export default Layout;
