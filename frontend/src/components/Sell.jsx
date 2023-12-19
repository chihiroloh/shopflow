import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
const Sell = () => {
  const userCtx = useContext(UserContext);
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [listings, setListings] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewListing({
      ...newListing,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/api/listings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken,
          },
          body: JSON.stringify(newListing),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create a new listing.");
      }

      const createdListing = await response.json();
      const timestampedListing = { ...createdListing, createdAt: new Date() };
      setListings([timestampedListing]);

      // Reset the form
      setNewListing({ title: "", description: "", price: "", category: "" });

      // Remove the listing after an hour
      setTimeout(() => {
        setListings((prevListings) =>
          prevListings.filter(
            (listing) => listing._id !== timestampedListing._id
          )
        );
      }, 3600000); // 3600000 milliseconds = 1 hour

      console.log("Listing created successfully.");
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      <hr />
      <Container style={{ flex: "1" }}>
        <div className="row">
          <div className="col-md-6">
            <h2>Create a New Listing</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newListing.title}
                onChange={handleInputChange}
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="description"
                value={newListing.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
              />
              <input
                type="number"
                name="price"
                value={newListing.price}
                onChange={handleInputChange}
                placeholder="Price"
                required
              />
              <select
                name="category"
                value={newListing.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
              </select>
              <button type="submit">Create Listing</button>
            </form>
          </div>

          <div className="col-md-5">
            <h2>New Listing</h2>
            {listings.length === 0 ? (
              <p>No new listings.</p>
            ) : (
              listings.map((listing) => (
                <div key={listing._id}>
                  <h3>{listing.title}</h3>
                  <p>{listing.description}</p>
                  <p>Price: ${listing.price}</p>
                  <p>Category: {listing.category}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Sell;
