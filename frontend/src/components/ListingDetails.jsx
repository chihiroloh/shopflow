import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MakeOffer from "./Offer";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ListingDetail = () => {
  const { id } = useParams();
  const userCtx = useContext(UserContext);

  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListingDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/listings/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch listing details");
        }
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListingDetail();
  }, [id]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <hr />
      <Container style={{ flexGrow: 1 }}>
        {" "}
        {/* This will make the container grow */}
        {listing && (
          <div>
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <p>Category: {listing.category}</p>
            <p>Price: ${listing.price}</p>
            {userCtx.userId !== listing.userId && <MakeOffer listing_id={id} />}
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default ListingDetail;
