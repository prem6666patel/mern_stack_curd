import React from "react";
import "../css/Error.css";

const Error = () => {
  return (
    <div className="pagenotfound-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a href="/" className="back-home">
        Go Back to Home
      </a>
    </div>
  );
};

export default Error;
