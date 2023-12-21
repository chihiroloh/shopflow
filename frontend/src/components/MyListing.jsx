import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Carousel,
} from "react-bootstrap";
import "./Module.css";

const MyListing = () => {
  const userCtx = useContext(UserContext);
  const [userListings, setUserListings] = useState([]);
  const [showUpdateOverlay, setShowUpdateOverlay] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [updatedListing, setUpdatedListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

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
          listing.offers = offers; // Add offers to the listing object
          return listing;
        })
      );

      setUserListings(listingsWithOffers);
    } catch (error) {
      console.error("Error fetching listings and offers:", error);
    }
  };

  const handleUpdateClick = (listing) => {
    setSelectedListing(listing);
    setUpdatedListing({
      title: listing.title,
      description: listing.description,
      price: listing.price,
      category: listing.category,
    });
    setShowUpdateOverlay(true);
  };

  const handleUpdateCancel = () => {
    setShowUpdateOverlay(false);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!selectedListing || !selectedListing._id) {
      console.error("No listing selected for update");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/listings/${selectedListing._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: JSON.stringify(updatedListing),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the listing.");
      }

      // immediately update the userListings state with the updated information
      setUserListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === selectedListing._id
            ? { ...listing, ...updatedListing }
            : listing
        )
      );

      setShowUpdateOverlay(false);
      setSelectedListing(null);
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  const handleDelete = async (listingId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/listings/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userCtx.accessToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the listing.");
      }

      // remove the deleted listing from the userListings state
      setUserListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };
  const handleStatusChange = async (listingId, offer, newStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/update/${offer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the offer status.");
      }

      setUserListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId
            ? {
                ...listing,
                offers: listing.offers.map((o) =>
                  o._id === offer._id ? { ...o, status: newStatus } : o
                ),
              }
            : listing
        )
      );
    } catch (error) {
      console.error("Error updating offer status:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <hr />
      <Container>
        <h1>My Listings & Offers</h1>
        <br />
        {userListings.length === 0 ? (
          <p>You have no listings.</p>
        ) : (
          <Row>
            {userListings.map((listing) => (
              <React.Fragment key={listing._id}>
                <Col xs={12} md={6} className="listing-col">
                  <h3>{listing.title}</h3>
                  <p>{listing.description}</p>
                  <p>Price: ${listing.price}</p>
                  <p>Category: {listing.category}</p>
                  <Button
                    id="btn-update"
                    className="none"
                    onClick={() => handleUpdateClick(listing)}
                  >
                    Update
                  </Button>
                  <Button
                    id="btn-cancel"
                    className="none"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this listing?"
                        )
                      ) {
                        handleDelete(listing._id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Col>

                {/* offer */}
                <Col xs={12} md={6}>
                  <div className="card border-success mb-3">
                    <div className="card-header">
                      Offers for {listing.title}
                    </div>
                    <div className="card-body text-success">
                      {listing.offers && listing.offers.length > 0 ? (
                        <Carousel className="custom-carousel">
                          {listing.offers.map((offer) => (
                            <Carousel.Item key={offer?._id}>
                              <div style={{ textAlign: "center" }}>
                                <p>
                                  <b>Buyer:</b> {offer.buyer}
                                </p>
                                <p>
                                  <b>Price:</b> ${offer.price}
                                </p>
                                <p>
                                  <b>Current status:</b> {offer.status}
                                </p>
                                <label htmlFor={`status-${offer._id}`}>
                                  <b>Update status below:</b>
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                  value={offer.status}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      listing._id,
                                      offer,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="pending">Pending</option>
                                  <option value="accepted">Accept</option>
                                  <option value="declined">Decline</option>
                                </select>
                              </div>
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      ) : (
                        <p>No offers yet</p>
                      )}
                    </div>
                  </div>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        )}
        {showUpdateOverlay && (
          <div className="overlay">
            <div className="update-form">
              <h2 class="text-center">Update Listing</h2>
              <br />
              <form onSubmit={handleUpdateSubmit}>
                <div className="overlay-input">
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={updatedListing.title}
                      onChange={(e) =>
                        setUpdatedListing({
                          ...updatedListing,
                          title: e.target.value,
                        })
                      }
                      placeholder="Title"
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={updatedListing.description}
                      onChange={(e) =>
                        setUpdatedListing({
                          ...updatedListing,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={updatedListing.price}
                      onChange={(e) =>
                        setUpdatedListing({
                          ...updatedListing,
                          price: e.target.value,
                        })
                      }
                      placeholder="Price"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={updatedListing.category}
                      onChange={(e) =>
                        setUpdatedListing({
                          ...updatedListing,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="updatelist">
                  <button
                    id="update-btn"
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Update Listing
                  </button>

                  <button
                    id="cancel-btn"
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={handleUpdateCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
      <br />
      <Footer />
    </div>
  );
};

export default MyListing;
