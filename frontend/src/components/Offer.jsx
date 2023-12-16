import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";

const Offer = ({ listing_id }) => {
  const [price, setPrice] = useState("");
  const [offerMade, setOfferMade] = useState(false);
  const [offerDetails, setOfferDetails] = useState(null);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const savedOfferDetails = localStorage.getItem("offerDetails");
    if (savedOfferDetails) {
      const offerData = JSON.parse(savedOfferDetails);
      // Check if the offer details belong to the current user
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

        // Save to localStorage
        localStorage.setItem("offerDetails", JSON.stringify(offerData));
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
      />
      <button onClick={submitOffer}>Make Offer</button>
      {offerMade && offerDetails && (
        <div>
          <hr />
          <h2>Offer Details</h2>
          <p>Price: ${offerDetails.price}</p>
          <p>Status: {offerDetails.status}</p>
          <p>Created At: {offerDetails.createdAt}</p>
          {offerDetails.buyer && <p>Buyer: {offerDetails.buyer}</p>}{" "}
          {/* Display buyer */}
          {offerDetails.listingDetails && (
            <div>
              <hr />
              <h2>Listing Details</h2>
              <p>ID: {offerDetails.listingDetails.id}</p>
              {/* Display other listing details here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Offer;
