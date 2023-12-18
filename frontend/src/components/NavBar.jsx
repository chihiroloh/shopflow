import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/shopflow.png";
import user from "../assets/user.png";
import "./Module.css";
import UserContext from "../contexts/user";

function NavBar() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication info, but not offer details
    userCtx.clearUserInfo(); // Clears user context
    localStorage.removeItem("accessToken"); // clear access token
    navigate("/login");
  };

  return (
    <div className="nav-wrapper">
      <Navbar expand="sm" className="custom-navbar">
        <Container>
          <Link to="/home" className="navbar-brand">
            <img src={logo} height="30" alt="shopflow Logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/home" className="nav-link">
                Home
              </Link>
              <Link to="/electronics" className="nav-link">
                Electronics
              </Link>
              <Link to="/fashion" className="nav-link">
                Fashion
              </Link>
            </Nav>
            <Nav className="ml-auto">
              {userCtx.isAdmin && (
                <Button
                  as={Link}
                  to="/admin"
                  className="nav-link"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  Admin
                </Button>
              )}
              <Link to="/sell" className="nav-link">
                Sell
              </Link>
              <Link to="/home" className="nav-link">
                Buy
              </Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <img
                    src={user}
                    width="40"
                    height="40"
                    className="rounded-circle"
                    alt="User"
                  />
                }
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item as={Link} to="/mylisting">
                  My Listings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/myoffer">
                  My Offers
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
