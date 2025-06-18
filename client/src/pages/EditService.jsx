import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service: "",
    price: "",
    provider: "",
    description: "",
  });

  

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/admin/service/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch service");
        }

        const data = await res.json();
        console.log("Service data to update:", data);

        setFormData({
          service: data.service,
          price: data.price,
          provider: data.provider,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching service data:", error.message);
      }
    };

    fetchService();
  }, [id]);

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
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/admin/service/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update service");
      }

      const result = await res.json();
      console.log("Updated service:", result);
      alert("Service updated successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error("Error updating service:", error.message);
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit Service Details</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <label>Service Name:</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Provider:</label>
        <input
          type="text"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Service</button>
      </form>
    </div>
  );
};

export default EditService;
