//login

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserContext from "../contexts/user";
import { jwtDecode } from "jwt-decode";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import image from "../assets/landingimg.jpg";

const Login = () => {
  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Set the background height to cover the entire viewport
    margin: 0, // Remove margin
    padding: 0, // Remove padding
  };
  const userCtx = useContext(UserContext);

  const colStyle = {
    padding: "60px", // Add padding to the MDBCol element
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    try {
      console.log("Logging in...");

      const response = await fetch(
        import.meta.env.VITE_SERVER + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Corrected from email to username
        }
      );

      console.log("Response received:", response);

      if (response.ok) {
        const data = await response.json();
        userCtx.setAccessToken(data.access);

        // Fetch user info
        const userInfoResponse = await fetch(
          import.meta.env.VITE_SERVER + "/api/auth/userinfo",
          {
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          }
        );

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          userCtx.setUserId(userInfo._id);
          userCtx.setUsername(userInfo.username);
          userCtx.setIsAdmin(userInfo.isAdmin);
          console.log("User info fetched successfully:", userInfo);

          navigate(userInfo.isAdmin ? "/admin" : "/home");
        } else {
          console.error(
            "Failed to fetch user info:",
            userInfoResponse.status,
            userInfoResponse.statusText
          );
        }
      } else {
        console.error("Login error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  const handleLogout = () => {
    // Clear user authentication info, but not offer details
    userCtx.clearUserInfo(); // Clears user context
    localStorage.removeItem("accessToken"); // Example: Clear access token
    // Do not remove 'offerDetails' here
    navigate("/login");
  };

  return (
    <div style={backgroundStyle}>
      <MDBContainer fluid className="p-0 my-0 h-100">
        <MDBRow className="h-100 no-gutters">
          <MDBCol col="4" md="6" style={colStyle}>
            <div className="divider d-flex align-items-center my-4"></div>
            <h1>Sign-in</h1>
            <MDBInput
              wrapperClass="mb-4"
              label="username"
              id="usernameFormControlLg" // Unique ID for username input
              type="text"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="passwordFormControlLg" // Unique ID for password input
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
            </div>
            <button onClick={handleLogin}>Login</button>

            {/* Register */}
            <div>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <Link to="/register" className="link-danger">
                  Register
                </Link>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
