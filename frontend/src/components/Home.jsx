import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/user";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import header from "../assets/headerimg.jpg";
import electronics from "../assets/electronics.png";
import fashion from "../assets/fashion.png";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./Module.css";

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
                      <h5>{listing.title}</h5>
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
      <Footer />
    </div>
  );
};

export default Home;
