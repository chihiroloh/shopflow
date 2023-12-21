//register
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/user";
import { jwtDecode } from "jwt-decode";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import image from "../assets/landingimg.jpg";

const Registration = () => {
  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    margin: 0,
    padding: 0,
  };

  const colStyle = {
    padding: "60px",
  };

  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        console.log("Registration successful. User Data:", userData);
        setRegistrationSuccess(true); // Set registration success state
        setShowSuccessMessage(true); // Show success message
      } else {
        console.error(
          "Registration error:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };
  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        navigate("/"); //offer under listing
      }, 3000); // Show the message for 3 seconds
    }

    return () => clearTimeout(timer);
  }, [showSuccessMessage, navigate]);

  return (
    <div style={backgroundStyle}>
      <MDBContainer fluid className="p-0 my-0 h-100">
        <MDBRow className="h-100 no-gutters">
          <MDBCol col="4" md="6" style={colStyle}>
            {!registrationSuccess && (
              <>
                <div className="divider d-flex align-items-center my-4"></div>
                <h1>Register</h1>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  id="usernameFormControlLg"
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="passwordFormControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  id="register-btn"
                  className="btn btn-primary"
                  onClick={handleRegistration}
                  type="submit"
                >
                  Register
                </button>
              </>
            )}
            {registrationSuccess && (
              <div>
                <h2 style={{ fontSize: "70px" }}>
                  Thank you for the registration!
                </h2>
                <p>You will now be redirected to the log-in page.</p>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Registration;
