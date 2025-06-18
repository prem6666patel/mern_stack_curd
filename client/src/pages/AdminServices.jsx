import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import EditServiceDialog from "@/components/EditServiceDialog";
import AddServiceDialog from "@/components/AddServiceDialog";

const AdminServices = () => {
  const { AuthorizationToken } = useAuth();
  const [serviceData, setServiceData] = useState([]);

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("services: ", data.response);
        setServiceData(data.response);
      }
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const deleteByid = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      const data = await response.json();
      console.log("Service deleted successfully:", data);

      setServiceData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Inline Styles
  const styles = {
    container: {
      maxWidth: "auto",
      margin: "10px auto",
      padding: "5px",
      fontFamily: "Arial, sans-serif",
    },
    addButton: {
      display: "inline-block",
      marginBottom: "20px",
      padding: "10px 18px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      textDecoration: "none",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "12px",
      border: "1px solid #ddd",
    },
    td: {
      padding: "12px",
      border: "1px solid #ddd",
      textAlign: "center",
    },
    editIcon: {
      fontSize: "20px",
      color: "#007bff",
      cursor: "pointer",
    },
    noData: {
      textAlign: "center",
      marginTop: "30px",
      color: "#777",
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.container}>
      {/* <Link to={`/admin/Addservices`} style={styles.addButton}>
        Add New Service
      </Link> */}

      <AddServiceDialog style={styles.addButton} getServices={getServices} />

      {serviceData.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Service Name</th>
              <th style={styles.th}>Provider</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Edit</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {serviceData.map((currData, index) => (
              <tr key={currData._id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{currData.service}</td>
                <td style={styles.td}>{currData.provider}</td>
                <td style={styles.td}>{currData.price}</td>
                <td style={styles.td}>{currData.description}</td>
                <td style={styles.td}>
                  {/* <Link to={`/admin/services/${currData._id}/edit`}>
                    <MdEditSquare style={styles.editIcon} />
                  </Link> */}

                  <EditServiceDialog
                    userid={currData._id}
                    getServices={getServices}
                  />
                </td>
                <td style={styles.td}>
                  <DeleteConfirmDialog
                    onDelete={() => deleteByid(currData._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noData}>No services found.</p>
      )}
    </div>
  );
};

export default AdminServices;
