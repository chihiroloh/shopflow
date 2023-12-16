import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";

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

      // Assuming each listing has a user object with a username
      // Use optional chaining to avoid errors if 'user' is undefined
      const userOwnedListings = listings.filter(
        (listing) => listing?.username === userCtx.username
      );

      // Debugging statement
      console.log("User's own listings:", userOwnedListings);

      // Fetch and set offers for each listing
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
    e.preventDefault(); // Prevents the default form submission behavior

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

      // Immediately update the userListings state with the updated information
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
      // Optionally, revert the state change if the server update fails
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

      // Remove the deleted listing from the userListings state
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

      // Update the UI dynamically
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
      <h2>Your Listings</h2>
      {userListings.length === 0 ? (
        <p>You have no listings.</p>
      ) : (
        <ul>
          {userListings.map((listing) => (
            <li key={listing._id}>
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <p>Price: ${listing.price}</p>
              <p>Category: {listing.category}</p>
              <button onClick={() => handleUpdateClick(listing)}>Update</button>
              <button
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
              </button>
              <br />
              <h4>Offers:</h4>
              <ul>
                {listing.offers &&
                  listing.offers.map((offer) => (
                    <li key={offer?._id}>
                      <p>Buyer: {offer.buyer}</p>
                      <p>Price: ${offer.price}</p>
                      <p>Status: {offer.status}</p>
                      <select
                        value={offer.status}
                        onChange={(e) =>
                          handleStatusChange(listing._id, offer, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                      </select>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {showUpdateOverlay && (
        <div className="overlay">
          <div className="update-form">
            <h2>Update Listing</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
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
              <input
                type="text"
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
              <input
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
              <select
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
              </select>
              <button type="submit">Update Listing</button>
              <button type="button" onClick={handleUpdateCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListing;
