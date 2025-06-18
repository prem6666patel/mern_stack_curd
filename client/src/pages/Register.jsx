import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Register = () => {
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("response from server:", res_data);

      if (response.ok) {
        storeToken(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      } else {
        alert(res_data.errors ? res_data.errors : res_data.message);
      }
    } catch (error) {
      console.log("error from register:", error);
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "60px auto",
      padding: "30px 40px",
      backgroundColor: "#f4f6f8",
      borderRadius: "12px",
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
      fontSize: "28px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#555",
      fontSize: "15px",
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "15px",
      backgroundColor: "#fff",
    },
    button: {
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username:
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            id="username"
            required
            autoComplete="off"
            value={user.username}
            onChange={handleInput}
            style={styles.input}
          />
        </div>

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
          <label htmlFor="phone" style={styles.label}>
            Phone:
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            id="phone"
            required
            autoComplete="off"
            value={user.phone}
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
          Register Now
        </button>
      </form>
    </div>
  );
};

export default Register;
