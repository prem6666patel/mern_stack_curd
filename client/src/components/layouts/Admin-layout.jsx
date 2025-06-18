import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUsersGear } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { MdHomeRepairService } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../../store/auth";

const Adminlayout = () => {
  const { userData, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading ... </h1>;
  }

  if (!userData.isAdmin) {
    return <Navigate to="/" />;
  }

  console.log("admin layout : ", userData);

  const styles = {
    layoutContainer: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f5f6fa",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "1rem",
    },
    navList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
    },
    navItem: {
      marginBottom: "-1.5rem",
    },
    navLink: {
      textDecoration: "none",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      borderRadius: "8px",
      transition: "background 0.3s ease",
    },
    mainContent: {
      flexGrow: 1,
      padding: "2rem",
    },
  };

  const getActiveStyle = ({ isActive }) => ({
    ...styles.navLink,
    backgroundColor: isActive ? "#2980b9" : "transparent",
  });

  return (
    <div style={styles.layoutContainer}>
      <nav style={styles.sidebar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <NavLink to="/admin/users" style={getActiveStyle}>
              <FaUsersGear />
              Users
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="/admin/contact" style={getActiveStyle}>
              <RiContactsBook2Fill />
              Contacts
            </NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="/admin/services" style={getActiveStyle}>
              <MdHomeRepairService />
              Services
            </NavLink>
          </li>
          {/* <li style={styles.navItem}>
            <NavLink to="/admin/home" style={getActiveStyle}>
              <FaHome />
              Home
            </NavLink>
          </li> */}
        </ul>
      </nav>

      <div style={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Adminlayout;
