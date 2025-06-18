import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdEditSquare } from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const AddServiceDialog = ({ getServices }) => {
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
      getServices();
      console.log("Service added:", result);
      alert("Service added successfully!");
      setOpen(false);
      navigate("/admin/services");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            style={{
              backgroundColor: "#f0f0f0",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MdEditSquare />
            Add Service
          </Button>
        </DialogTrigger>

        <DialogContent
          style={{
            maxWidth: "500px",
            padding: "20px",
            margin: "auto",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Add New Service
            </DialogTitle>
            <DialogDescription style={{ fontSize: "14px", color: "#555" }}>
              Fill in the details to add a new service.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div style={{ padding: "20px 0" }}>
              <div style={{ marginBottom: "16px" }}>
                <Label htmlFor="service" style={{ fontWeight: "600" }}>
                  Service Name
                </Label>
                <Input
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "8px" }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Label htmlFor="description" style={{ fontWeight: "600" }}>
                  Description
                </Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    height: "80px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                    marginTop: "8px",
                  }}
                ></textarea>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Label htmlFor="price" style={{ fontWeight: "600" }}>
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "8px" }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Label htmlFor="provider" style={{ fontWeight: "600" }}>
                  Provider
                </Label>
                <Input
                  id="provider"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  required
                  style={{ marginTop: "8px" }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                Add Service
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddServiceDialog;
