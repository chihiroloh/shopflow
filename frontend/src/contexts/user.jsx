import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
  accessToken: null,
  setAccessToken: () => {},
  userId: null,
  setUserId: () => {},
  username: "Default User",
  setUsername: () => {},
  isAdmin: false, // Add isAdmin with a default value
  setIsAdmin: () => {}, // Add setIsAdmin function
});

const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("Default User");
  const [isAdmin, setIsAdmin] = useState(false); // Initialize isAdmin state

  useEffect(() => {
    fetchUserData();
  }, [accessToken]);

  useEffect(() => {
    console.log("User Context Username:", username);
  }, [username]);

  // Function to fetch user data
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
        setIsAdmin(userData.isAdmin); // Set isAdmin from the response
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Fetch user data when accessToken changes
  useEffect(() => {
    fetchUserData();
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userId,
        setUserId,
        username,
        setUsername,
        isAdmin, // Provide isAdmin in the context
        setIsAdmin, // Provide setIsAdmin function in the context
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
export default UserContext;
