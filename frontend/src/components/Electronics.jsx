import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Container, Col, Row, Image } from "react-bootstrap";
import electronicsheader from "../assets/electronicsheader.png";

const Electronics = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListingsByCategory("electronics");
  }, []);

  const fetchListingsByCategory = async (category) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/api/listings/category/Electronics"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setListings(data);
      } else {
        console.error("Response is not valid JSON");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {" "}
      <NavBar />
      <Image src={electronicsheader} fluid style={{ maxWidth: "100%" }} />
      <Container>
        <br />
        <Row>
          {listings.map((listing) => (
            <Col key={listing._id} xs={12} sm={6}>
              <Link to={`/listing/${listing._id}`}>
                <button className="listing-button">
                  <div className="listing">
                    <h5>{listing.title}</h5>
                    <p>{listing.description}</p>
                    <p>Price: ${listing.price}</p>
                    <p>Posted by: {listing.username}</p>
                  </div>
                </button>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <Footer />
    </div>
  );
};

export default Electronics;
