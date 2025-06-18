import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/Addservice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      const result = await response.json();
      console.log("Service added:", result);
      alert("Service added successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Something went wrong!");
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "30px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      height: "80px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Service
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Service Name:</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          ></textarea>
        </div>

        <div>
          <label style={styles.label}>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Provider:</label>
          <input
            type="text"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
