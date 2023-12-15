import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const MyOffer = () => {
  const location = useLocation();
  const { offerDetails } = location.state || {};

  return (
    <div>
      <NavBar />
      <hr />
      <h1>My Offers</h1>
      {offerDetails ? (
        <div>
          <p>Made Offer</p>
          <div>
            <p>Price: ${offerDetails.price}</p>
            <p>Status: {offerDetails.status}</p>
            <p>Created At: {offerDetails.createdAt}</p>
            <p>Posted By: {offerDetails.username}</p>
          </div>
        </div>
      ) : (
        <p>You have no offers.</p>
      )}
    </div>
  );
};

export default MyOffer;
