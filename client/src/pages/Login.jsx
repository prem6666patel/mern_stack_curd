import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Login = () => {
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted user:", user);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("response data:", res_data);

      if (response.ok) {
        storeToken(res_data.token);
        setUser({ email: "", password: "" });
        alert("Login successful!");
        navigate(res_data.isAdmin ? "/admin/users" : "/");
      } else {
        alert(res_data.errors ? res_data.errors : res_data.error);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const styles = {
    container: {
      maxWidth: "450px",
      margin: "80px auto",
      padding: "30px 40px",
      backgroundColor: "#f0f2f5",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#333",
      fontSize: "26px",
    },
    formGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "bold",
      color: "#444",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "15px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            id="email"
            required
            autoComplete="off"
            value={user.email}
            onChange={handleInput}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            id="password"
            required
            autoComplete="off"
            value={user.password}
            onChange={handleInput}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Login Now
        </button>
      </form>
    </div>
  );
};

export default Login;
