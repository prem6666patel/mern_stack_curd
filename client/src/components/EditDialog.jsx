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

const EditDialog = ({ userid }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!userid) return;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/admin/users/${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await res.json();
        setFormData({
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUser();
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
        `http://localhost:5000/api/admin/users/update/${userid}`,
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
        throw new Error("Update failed");
      }

      const result = await res.json();
      console.log(result);

      alert("User updated successfully!");
      setOpen(false);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Update failed!");
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
            {/* Edit Profile */}
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
              Edit Profile
            </DialogTitle>
            <DialogDescription style={{ fontSize: "14px", color: "#555" }}>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div style={{ padding: "20px 0" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Label
                  htmlFor="username"
                  style={{
                    width: "100px",
                    marginRight: "10px",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Label
                  htmlFor="email"
                  style={{
                    width: "100px",
                    marginRight: "10px",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Label
                  htmlFor="phone"
                  style={{
                    width: "100px",
                    marginRight: "10px",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
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

export default EditDialog;

// solve error in this code
