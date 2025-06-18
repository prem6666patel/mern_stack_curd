import { useEffect, useState } from "react";
import "../css/AdminContact.css";

const AdminContact = () => {
  const [contactData, setContactData] = useState([]);

  const getcontactData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        console.log("contact data : ", data.contactsData);
        setContactData(data.contactsData);
      }
    } catch (error) {
      console.log("fetch to contacts details error: ", error);
    }
  };

  useEffect(() => {
    getcontactData();
  }, []);

  return (
    <>
      {contactData.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((currData, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{currData.username}</td>
                <td>{currData.email}</td>
                <td>{currData.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contact data found.</p>
      )}
    </>
  );
};

export default AdminContact;
