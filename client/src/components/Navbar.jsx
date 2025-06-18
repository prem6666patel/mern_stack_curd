import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <h3>Mern Stack</h3>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/servies">Services</NavLink>
              </li>

              {isAuthenticated ? (
                <li>
                  <NavLink to="/logout">logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
