import React, { useState, useContext } from "react";
import UserContext from "../contexts/user";
import { useNavigate } from "react-router-dom";

const Offer = ({ listing_id }) => {
  const [price, setPrice] = useState("");
  const [offerMade, setOfferMade] = useState(false);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const submitOffer = async () => {
    const requestUrl = `${import.meta.env.VITE_SERVER}/api/create`; // Adjusted URL
    const requestBody = {
      listingId: listing_id, // Include listing_id
      price: parseInt(price), // Convert to number
    };

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
        setOfferDetails(responseData);
        navigate("/myoffer", { state: { offerDetails: responseData } });
      } else {
        console.log("Failed to make offer");
      }
    } catch (error) {
      console.error("Error submitting offer", error.message);
      // Handle the error
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
      {offerMade && (
        <div>
          <p>Made Offer</p>
          {offerDetails && (
            <div>
              <p>Price: ${offerDetails.price}</p>
              <p>Status: {offerDetails.status}</p>
              <p>Created At: {offerDetails.createdAt}</p>
              {offerDetails.username && (
                <p>Posted by: {offerDetails.username}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Offer;
