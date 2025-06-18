import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../css/AdminUser.css";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import EditDialog from "../components/EditDialog";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const { AuthorizationToken } = useAuth();

  const getAllUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data.userData)) {
        setUsers(data.userData);
      } else {
        console.error("Unexpected response format:", data);
        setUsers([]);
      }

      console.log("user data:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delete user

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();
      console.log("response after user delete:", data);

      // Remove user from UI
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // update user by id

  // const updateUserById = async () => {
  //   console.log("click by update button");
  // };

  return (
    <div className="admin-users">
      {users.length > 0 ? (
        <div className="flex justify-center mt-8">
          <table className="min-w-[800px] text-center border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Edit</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.email} className="border">
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.phone}</td>
                  <td className="px-4 py-2 border">
                    {/* <Link to={`/admin/users/${user._id}/edit`}>
                      <MdEditSquare className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                    </Link> */}
                    <EditDialog userid={user._id}></EditDialog>
                  </td>

                  <td className="px-4 py-2 border">
                    <DeleteConfirmDialog
                      onDelete={() => deleteUser(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminUser;
