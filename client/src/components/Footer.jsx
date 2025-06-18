import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} Mern Stack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
