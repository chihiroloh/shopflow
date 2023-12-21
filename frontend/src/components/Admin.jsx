import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Container, Button } from "react-bootstrap";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    isAdmin: false,
  });
  const userCtx = useContext(UserContext);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/auth/users`,
        {
          headers: {
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
        }
      );

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      } else {
        console.error(
          "Failed to fetch users:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    if (userCtx.isAdmin) {
      fetchUsers();
    }
  }, [userCtx.accessToken, userCtx.isAdmin, fetchUsers]);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditFormData({ username: user.username, isAdmin: user.isAdmin });
  };

  const handleUpdateUser = async (userId) => {
    try {
      const updatedData = {
        ...editFormData,
        isAdmin: editFormData.isAdmin === "true",
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/auth/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        fetchUsers();
        setEditingUserId(null);
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/api/auth/users/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userCtx.accessToken}`,
            },
          }
        );

        if (response.ok) {
          fetchUsers();
        } else {
          console.error("Failed to delete user:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    }
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <>
      <NavBar />
      <hr />
      <Container style={{ flex: "1" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>All Users</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {users.map((user) => (
              <li key={user._id} style={{ marginBottom: "10px" }}>
                {editingUserId === user._id ? (
                  <>
                    <input
                      type="text"
                      name="username"
                      value={editFormData.username}
                      onChange={handleEditFormChange}
                    />
                    <select
                      name="isAdmin"
                      value={editFormData.isAdmin ? "true" : "false"}
                      onChange={handleEditFormChange}
                    >
                      <option value="false">User</option>
                      <option value="true">Admin</option>
                    </select>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        className="none"
                        onClick={() => handleUpdateUser(user._id, editFormData)}
                      >
                        Save
                      </Button>
                      <Button
                        className="btn btn-warning"
                        onClick={() => setEditingUserId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {user.username} - {user.isAdmin ? "Admin" : "User"}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        id="btn-update"
                        className="none"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        id="btn-cancel"
                        className="none"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Admin;
