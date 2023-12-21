import React from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import ig from "../assets/ig.png";
import x from "../assets/x.png";
import fb from "../assets/fb.png";
import "./Module.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Adjust py-2 for shorter height */}
      <Container className="footercontainer">
        {/* Top Section */}
        <Row>
          <Col md={6} lg={3} className="mb-4">
            <div className="mb-3">
              <a href="index.html">
                <Image src={logo} fluid className="w-20" />{" "}
                {/* Adjust w-50 for smaller logo */}
              </a>
            </div>
            {/* Social Links */}
            <div>
              <h8 className="smaller-text">Follow us</h8>
              <ul className="list-unstyled d-flex">
                {/* Social Icons */}
                <li>
                  <a href="#" className="text-white me-2">
                    <i className="fa fa-facebook">
                      <img src={fb} alt="Facebook" />
                    </i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white me-2">
                    <i className="fa fa-twitter">
                      <img src={x} alt="Twitter" />
                    </i>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white me-2">
                    <i className="fa fa-instagram">
                      <img src={ig} alt="Instagram" />
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={6} lg={8} className="content-above-footer">
            <Row>
              {/* Contact Section */}
              <Col md={6} className="mb-4">
                <div>
                  <i className="fa fa-map-o" aria-hidden="true"></i>
                  <div>
                    <br />
                    <p className="smaller-text">About</p>{" "}
                    <p className="smaller-text">Privacy & Policy</p>{" "}
                    <p className="smaller-text">Terms & Condition</p>{" "}
                  </div>
                </div>
              </Col>
              {/* Subscribe Section */}
              <Col md={6} className="mb-4">
                <br />
                <p className="smaller-text">
                  Stay up to date with the latest deals and offers!
                </p>{" "}
                {/* Adjust text size */}
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      className="text-sm"
                    />{" "}
                    {/* Apply text-sm class for smaller text */}
                  </Form.Group>
                  <Button className="btn btn-sm" id="custom-button-color">
                    Subscribe
                  </Button>
                  {/* Apply btn-sm class for smaller button */}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
