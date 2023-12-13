import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/carousell-logo.png";
import "./Module.css";

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterShow = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleLoginClose();
  };

  return (
    <div className="nav-wrapper">
      <Navbar className="custom-navbar">
        <Container>
          <Link to="/">
            <img id="logo" src={logo} height="80" alt="Carousell Logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/electronics">Electronics</Link>
            <Link to="/fashion">Fashion</Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Link to="/allcategories">All Categories</Link>
            {!isLoggedIn && (
              <>
                <Button
                  style={{
                    backgroundColor: "red",
                    borderColor: "red",
                    margin: "0 10px",
                  }}
                  onClick={handleRegisterShow}
                >
                  Register
                </Button>
                <Button
                  style={{ backgroundColor: "red", borderColor: "red" }}
                  onClick={handleLoginShow}
                >
                  Login
                </Button>
              </>
            )}
            <Button style={{ backgroundColor: "red", borderColor: "red" }}>
              <Link to="/sell" style={{ color: "white" }}>
                Sell
              </Link>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="custom-div">
        <Container>
          <Form className="d-flex">
            <FormControl
              style={{ backgroundColor: "#f8f8f9" }}
              type="text"
              placeholder="Search for anything and everything"
              className="me-2 custom-input"
            />
            <Button
              style={{ backgroundColor: "#008f79", borderColor: "#008f79" }}
            >
              Search
            </Button>
          </Form>
        </Container>
      </div>

      {/* Login Popup */}
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="secondary" onClick={handleLoginClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Register Popup */}
      <Modal show={showRegister} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleRegisterClose}>
            Register
          </Button>
          <Button variant="secondary" onClick={handleRegisterClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NavBar;
