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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditServiceDialog = ({ userid, getServices }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    service: "",
    price: "",
    provider: "",
    description: "",
  });

  useEffect(() => {
    if (!userid) return;

    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/admin/service/${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch service");

        const data = await res.json();
        setFormData({
          service: data.service || "",
          price: data.price || "",
          provider: data.provider || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error("Error fetching service data:", error.message);
      }
    };

    fetchService();
  }, [userid]);

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
        `http://localhost:5000/api/admin/service/update/${userid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update service");

      const result = await res.json();
      console.log("Updated service:", result);
      getServices();
      alert("Service updated successfully!");
      setOpen(false);
      navigate("/admin/services");
    } catch (error) {
      console.error("Error updating service:", error.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
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
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Make changes to the service. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div style={{ padding: "20px 0" }}>
              {["service", "provider", "price", "description"].map((field) => (
                <div
                  key={field}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Label
                    htmlFor={field}
                    style={{
                      width: "100px",
                      marginRight: "10px",
                      textAlign: "right",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {field}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    tabIndex={-1}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditServiceDialog;
