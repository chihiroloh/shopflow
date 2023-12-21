import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Sell from "./components/Sell";
import Register from "./components/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Listing from "./components/MyListing";
import { UserProvider } from "./contexts/user";
import MyListing from "./components/MyListing";
import Fashion from "./components/Fashion";
import Electronics from "./components/Electronics";
import Admin from "./components/Admin"; // Import the AdminView component
import ListingDetails from "./components/ListingDetails";
// import OffersList from "./components/OffersList";
import Offer from "./components/Offer";
import MyOffer from "./components/MyOffer";
import Profile from "./components/Profile";
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />{" "}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/mylisting" element={<MyListing />} />
          <Route path="/myoffer" element={<MyOffer />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          {/* <Route path="/offerslist" element={<OffersList />} /> */}
          <Route path="/offer" element={<Offer />} />
          <Route path="/myoffer" element={<MyOffer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
