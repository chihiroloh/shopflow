import React from "react";

const OfferItem = ({ offer }) => {
  return (
    <div className="offer-item">
      <h4>Offer Details</h4>
      <p>Price: ${offer.price}</p>
      <p>Status: {offer.status}</p>
      <p>Created At: {new Date(offer.createdAt).toLocaleString()}</p>
      <p>Posted By: {offer.username}</p>
    </div>
  );
};

export default OfferItem;
