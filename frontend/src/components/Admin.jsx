import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER + "/api/auth/users",
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

    if (userCtx.isAdmin) {
      fetchUsers();
    }
  }, [userCtx.accessToken, userCtx.isAdmin]);

  return (
    <>
      <NavBar />
      <hr />
      <div>
        <h2>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              {user.username} - {user.isAdmin ? "Admin" : "User"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Admin;
