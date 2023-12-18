import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/user";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import header from "../assets/headerimg.jpg";
import electronics from "../assets/electronics.png";
import fashion from "../assets/fashion.png";
import NavBar from "./NavBar";
import "./Module.css";
import logo from "../assets/logo.png";
import ig from "../assets/ig.png";
import x from "../assets/x.png";
import fb from "../assets/fb.png";

const Home = () => {
  const userCtx = useContext(UserContext);
  const username = userCtx.username;
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/listings");
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="homepage">
        <div className="home-content">
          <img src={header} alt="Header" />
          <Container>
            <p className="home-category-text">Category</p>
            <div className="home-overlay">
              <h1
                className="deals-header"
                style={{ fontSize: "60px", fontStyle: "italic" }}
              >
                Where deals come to life.
              </h1>
              <div>
                <Link to="/sell">
                  <button className="home-button">Sell Now</button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
        <br />
        <br />

        {/* Category */}
        <Container>
          <div className="listing-div">
            <h1 className="hello">Hello, {username}!</h1>
            <h2 className="buy-now-text">Buy now</h2>
            <br />
            <h4 className="text-below-content">What are you looking for?</h4>
            <Row className="box-container">
              <Col xs={12} md={6} className="button-like">
                <Link to="/electronics">
                  <img
                    src={electronics}
                    alt="Electronics"
                    className="small-electronics"
                  />
                  <p className="box-text">Electronics</p>
                </Link>
              </Col>
              <Col xs={12} md={6} className="button-like">
                <Link to="/fashion">
                  <img
                    src={fashion}
                    alt="Fashion"
                    className="small-electronics"
                  />
                  <p className="box-text">Fashion</p>
                </Link>
              </Col>
            </Row>
          </div>
          <br />

          <h4 className="text-below">All listings</h4>
          <br />
          <Row className="listings-container">
            {listings.map((listing) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={listing._id}
                className="mb-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <button className="listing-button">
                    <div className="listing">
                      <h4>{listing.title}</h4>
                      <br />
                      <p>Price: ${listing.price}</p>
                      <p>Posted by: {listing.username}</p>
                    </div>
                  </button>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* footer */}
      <footer className="bg-dark text-white py-3">
        <Container>
          {/* Top Section */}
          <Row>
            <Col md={10} lg={3} className="mb-4">
              <div className="mb-3">
                <a href="index.html">
                  <Image src={logo} fluid className="w-25" />
                </a>
              </div>
              {/* Social Links */}
              <div>
                <h5>Follow us</h5>
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

            <Col md={12} lg={8}>
              <Row>
                {/* Contact Section */}
                <Col md={6} className="mb-4">
                  <div>
                    <i className="fa fa-map-o" aria-hidden="true"></i>
                    <div>
                      <h5>Orchard Road, Singapore</h5>
                      <p>123 Orchard Avenue</p>
                      <br />
                      <p>About</p>
                      <p>Privacy & Policy</p>
                      <p>Terms & Condition</p>
                    </div>
                  </div>
                </Col>
                {/* Subscribe Section */}
                <Col md={6} className="mb-4">
                  <h5>Subscribe</h5>
                  <p>Be up to date in the latest deals and offers!</p>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email Address" />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                      Subscribe
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
