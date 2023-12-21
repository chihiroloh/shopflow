import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import { Container, Row, Col, Card } from "react-bootstrap";

const Offer = ({ listing_id }) => {
  const [price, setPrice] = useState("");
  const [offerMade, setOfferMade] = useState(false);
  const [offerDetails, setOfferDetails] = useState(null);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const savedOfferDetails = localStorage.getItem("offerDetails");
    if (savedOfferDetails) {
      const offerData = JSON.parse(savedOfferDetails);
      // check if the offer details belong to the current user
      if (offerData.userId === userCtx.userId) {
        setOfferDetails(offerData);
        setOfferMade(true);
      }
    }
  }, [userCtx.userId]);

  const submitOffer = async () => {
    const requestUrl = `${
      import.meta.env.VITE_SERVER
    }/api/create/${listing_id}`;
    const requestBody = { price };

    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userCtx.accessToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData) {
        alert("Offer submitted!");
        setOfferMade(true);
        const offerData = {
          ...responseData,
          userId: userCtx.userId,
        };
        setOfferDetails(offerData);
      } else {
        console.log("Failed to make an offer");
      }
    } catch (error) {
      console.error("Error submitting an offer", error.message);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Your Price Offer"
        style={{ marginRight: "10px" }} // Adding right margin to the input
      />
      <button
        onClick={submitOffer}
        className="btn btn-outline-success" // Apply the same style as the "Create Listing" button
        style={{ marginBottom: "10px" }} // Adding bottom margin to the button
      >
        Make Offer
      </button>
      {offerMade && offerDetails && (
        <Card
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: "20px" }}
        >
          <Card.Body>
            <Card.Title>Your Offer</Card.Title>
            <Card.Text>
              Price: ${offerDetails.price}
              <br />
              Status: {offerDetails.status}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {/* Separate Row for Listing Details */}
      {offerMade && offerDetails && offerDetails.listingDetails && (
        <Row className="mt-3">
          <Col md={{ span: 6, offset: 6 }}>
            <Card>
              <Card.Body>
                <Card.Title>Listing Details</Card.Title>
                <Card.Text>
                  ID: {offerDetails.listingDetails.id}
                  {/* Display other listing details here */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Offer;
