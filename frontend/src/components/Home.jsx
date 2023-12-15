import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/user";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import header from "../assets/headerimg.jpg";
import electronics from "../assets/electronics.png";
import fashion from "../assets/fashion.png";
import NavBar from "./NavBar";
import "./Module.css";

const Home = () => {
  const userCtx = useContext(UserContext);
  const username = userCtx.username; // Get the username from UserContext
  const [listings, setListings] = useState([]); // State to store listings

  useEffect(() => {
    // Function to fetch listings
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/listings"); // Adjust URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="home-content">
        <img src={header} alt="Header" />
        <Container>
          <p className="home-category-text">Category</p>
          <div className="home-overlay">
            <h1>Where deals come to life.</h1>
            <div>
              <Link to="/sell">
                <button className="home-button">Sell Now</button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <br />
      <br />

      {/* Category */}
      <Container>
        <div className="listing-div">
          <h1 className="hello">Hello, {username}!</h1>{" "}
          <h2 className="buy-now-text">Buy now</h2>
          <br />
          <h4 className="text-below-content">What are you looking for?</h4>
          <div className="box-container">
            <Link to="/electronics">
              <div className="button-like">
                <img
                  src={electronics}
                  alt="Electronics"
                  className="small-electronics"
                />
                <p className="box-text">Electronics</p>
              </div>
            </Link>
            <Link to="/fashion">
              <div className="button-like" style={{ marginLeft: "50px" }}>
                <img
                  src={fashion}
                  alt="Fashion"
                  className="small-electronics"
                />
                <p className="box-text">Fashion</p>
              </div>
            </Link>
          </div>
        </div>
        <br />
        <h4 className="text-below">All listings</h4>
        <div className="listings-container">
          {listings.map((listing) => (
            <Link to={`/listing/${listing._id}`} key={listing._id}>
              <button className="listing-button">
                <div className="listing">
                  <h5>{listing.title}</h5>
                  <p>{listing.description}</p>
                  <p>Price: ${listing.price}</p>
                  <p>Posted by: {listing.username}</p>
                  {/* Display the username here */}
                </div>
              </button>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
