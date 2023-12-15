import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
const OffersList = ({ listingId }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/listing/${listingId}/offers`)
      .then((response) => setOffers(response.data))
      .catch((error) => console.error("Error fetching offers", error));
  }, [listingId]);

  const updateOfferStatus = (offerId, status) => {
    axios
      .put(`/api/offers/${offerId}/${status}`)
      .then((response) => {
        alert(`Offer ${status}!`);
        // Refresh offers list after status update
        setOffers(
          offers.map((offer) =>
            offer._id === offerId ? { ...offer, status } : offer
          )
        );
      })
      .catch((error) => console.error("Error updating offer", error));
  };

  return (
    <div>
      <NavBar />
      {offers.map((offer) => (
        <div key={offer._id}>
          <p>Offer Price: {offer.price}</p>
          <button onClick={() => updateOfferStatus(offer._id, "accepted")}>
            Accept
          </button>
          <button onClick={() => updateOfferStatus(offer._id, "declined")}>
            Decline
          </button>
        </div>
      ))}
    </div>
  );
};

export default OffersList;
