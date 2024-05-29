import React from "react";
import { Link } from "gatsby";
function navbar() {
  let jwtToken;
  if (typeof window !== "undefined") {
    jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      navigate("/");
    }
  }

  // const isLoggedIn = !!localStorage.getItem("jwt");
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/product/createP">Create Product</Link>
        </li>

        {/* <li>
          {isLoggedIn ? (
            <Link to="/logout">
              <a href="logout">Logout</a>
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li>
          {isLoggedIn ? (
            <p>Welcome, User!</p>
          ) : (
            <Link to="/signup">
              <a href="signup">SignUp</a>
            </Link>
          )}
        </li> */}
      </ul>
    </div>
  );
}

export default navbar;
