import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";

const MyOffer = () => {
  const [offers, setOffers] = useState([]);
  const userCtx = useContext(UserContext);

  const handleCancelOffer = async (offerId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/cancel/${offerId}`,
        {
          method: "PATCH", // Use PATCH to cancel the offer
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Refresh the offers after canceling
      fetchOffers();
    } catch (error) {
      console.error("Failed to cancel offer:", error);
    }
  };

  const fetchOffers = async () => {
    try {
      if (!userCtx.userId) {
        console.warn("userCtx.userId is not defined.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/user/${userCtx.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  useEffect(() => {
    if (userCtx.userId) {
      fetchOffers();
    }
  }, [userCtx.userId, userCtx.accessToken]);

  return (
    <div>
      <NavBar />
      <hr />
      <h1>My Offers</h1>
      {offers.length > 0 ? (
        offers.map((offer) => (
          <div key={offer._id}>
            <p>{offer.listing.title}</p>
            <p>Price: ${offer.price}</p>
            <p>Status: {offer.status}</p>
            {offer.status !== "cancelled" && (
              <button onClick={() => handleCancelOffer(offer._id)}>
                Cancel
              </button>
            )}
            <br />
          </div>
        ))
      ) : (
        <p>You have not made any offers.</p>
      )}
    </div>
  );
};

export default MyOffer;
