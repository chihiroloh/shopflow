import React, { createContext, useState, useEffect } from "react";
import "../contexts/user";

const UserContext = createContext({
  accessToken: null,
  setAccessToken: () => {},
  userId: null,
  setUserId: () => {},
  username: "Default User",
  setUsername: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("Default User");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [accessToken]);

  useEffect(() => {
    console.log("User Context Username:", username);
  }, [username]);

  const fetchUserData = async () => {
    if (accessToken) {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER + "/api/auth/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        setUsername(userData.username);
        setUserId(userData._id);
        setIsAdmin(userData.isAdmin);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userId,
        setUserId,
        username,
        setUsername,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
