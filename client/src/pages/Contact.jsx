import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const Contact = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { userData } = useAuth();

  useEffect(() => {
    if (userData) {
      setUser({
        username: userData.username || "",
        email: userData.email || "",
        message: "",
      });
    }
  }, [userData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Message sent successfully!");
        setUser((prev) => ({ ...prev, message: "" }));
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong while sending the message.");
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "50px auto",
      padding: "30px",
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#444",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
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
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username:{" "}
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
            Email:{" "}
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
          <label htmlFor="message" style={styles.label}>
            Message:{" "}
          </label>
          <textarea
            name="message"
            placeholder="Enter message"
            id="message"
            required
            autoComplete="off"
            cols={30}
            rows={5}
            value={user.message}
            onChange={handleInput}
            style={styles.textarea}
          />
        </div>

        <button type="submit" style={styles.button}>
          Send Now
        </button>
      </form>
    </div>
  );
};

export default Contact;
