import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import profile from "../assets/profile.jpeg";
import Footer from "./Footer";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const [userListings, setUserListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userCtx.accessToken) {
      fetchUserListings();
    }
  }, [userCtx.accessToken]);

  const fetchUserListings = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/api/listings",
        {
          headers: {
            Authorization: "Bearer " + userCtx.accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch listings.");
      }
      const listings = await response.json();

      console.log("Listings received from the server:", listings);
      console.log("User Context Username:", userCtx.username);

      const userOwnedListings = listings.filter(
        (listing) => listing?.username === userCtx.username
      );

      console.log("User's own listings:", userOwnedListings);

      const listingsWithOffers = await Promise.all(
        userOwnedListings.map(async (listing) => {
          const offersResponse = await fetch(
            `${import.meta.env.VITE_SERVER}/api/listing/${listing._id}`,
            {
              headers: {
                Authorization: "Bearer " + userCtx.accessToken,
              },
            }
          );
          if (!offersResponse.ok) {
            throw new Error(
              `Failed to fetch offers for listing ${listing._id}`
            );
          }
          const offers = await offersResponse.json();
          listing.offers = offers;
          return listing;
        })
      );

      setUserListings(listingsWithOffers);
    } catch (error) {
      console.error("Error fetching listings and offers:", error);
    }
  };

  const navigateToListingPage = (listingId) => {
    navigate(`/listing/${listingId}`);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      <hr />
      <div className="container" style={{ flex: "1" }}>
        <h1 className="profile-text">My Profile</h1>
        <div className="row">
          {/* Profile Column */}
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title">{userCtx.username}</h2>
                <p className="card-text">No ratings yet</p>
                <p className="card-text">Singapore</p>
                <p className="card-text">Verified</p>
                <br />
                <p className="card-text">0 Followers 0 Following</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h4 className="card-title">Listings</h4>
                  </div>
                  <div className="col-md-6 text-end">
                    <Link to="/mylisting" className="card-link">
                      Manage Listings
                    </Link>
                  </div>
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-between">
                  {userListings.length === 0 ? (
                    <p>No listings available.</p>
                  ) : (
                    userListings.map((listing) => (
                      <button
                        key={listing._id}
                        onClick={() => navigateToListingPage(listing._id)}
                        className="listing-button"
                        style={{
                          flex: "1",
                          margin: "10px",
                          flexBasis: "calc(25% - 20px)",
                        }}
                      >
                        <div className="listing">
                          <p>{listing.title}</p>
                          <p>Price: ${listing.price}</p>
                          <p>Posted by: {listing.username}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
