import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/shopflow.png";
import user from "../assets/user.png";
import "./Module.css";
import UserContext from "../contexts/user"; // Import the UserContext

function NavBar() {
  const userCtx = useContext(UserContext); // Access the UserContext

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
            <Nav>
              {userCtx.isAdmin && (
                <Button as={Link} to="/admin" variant="primary">
                  Users
                </Button>
              )}
              <button>
                <Link to="/sell">Sell</Link>
              </button>
              <button>
                <Link to="/home">Buy</Link>
              </button>
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
                <NavDropdown.Item as={Link} to="/">
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
