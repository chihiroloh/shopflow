import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import MakeOffer from "./Offer";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";

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
    <Container>
      <NavBar />
      <hr />
      {listing && (
        <div>
          <h1>{listing.title}</h1>
          <p>{listing.description}</p>
          <p>Category: {listing.category}</p>
          <p>Price: ${listing.price}</p>
          {/* Check if the logged-in user is not the owner of the listing */}
          {userCtx.userId !== listing.userId && <MakeOffer listing_id={id} />}
        </div>
      )}
    </Container>
  );
};

export default ListingDetail;
