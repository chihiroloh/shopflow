import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const MyOffer = () => {
  const [offers, setOffers] = useState([]);
  const userCtx = useContext(UserContext);
  const [popupMessage, setPopupMessage] = useState("");

  const handleCancelOffer = async (offerId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/cancel/${offerId}`,
        {
          method: "PATCH",
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
    setPopupMessage("Offer cancelled");
    setTimeout(() => setPopupMessage(""), 3000); // Hide the message after 3 seconds
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
      {popupMessage && (
        <div className="alert alert-success">{popupMessage}</div>
      )}
      <Container>
        <Row>
          {/* Active Offers Column */}
          <Col md={6}>
            <h1>Active Offers</h1>
            {offers.filter((offer) => offer.status !== "cancelled").length >
            0 ? (
              offers
                .filter((offer) => offer.status !== "cancelled")
                .map((offer) => (
                  <Card key={offer._id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{offer.listing.title}</Card.Title>
                      <Card.Text>
                        Price: ${offer.price}
                        <br />
                        Status: {offer.status}
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleCancelOffer(offer._id)}
                      >
                        Withdraw Offer
                      </Button>
                    </Card.Body>
                  </Card>
                ))
            ) : (
              <p>You have not made any active offers.</p>
            )}
          </Col>

          {/* Inactive Offers Column */}
          <Col md={6}>
            <h1>Inactive Offers</h1>
            {offers.filter((offer) => offer.status === "cancelled").length >
            0 ? (
              offers
                .filter((offer) => offer.status === "cancelled")
                .map((offer) => (
                  <Card key={offer._id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{offer.listing.title}</Card.Title>
                      <Card.Text>
                        Price: ${offer.price}
                        <br />
                        Status: {offer.status}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
            ) : (
              <p>You have no inactive offers.</p>
            )}
          </Col>
        </Row>
      </Container>
      <br />
      <Footer />
    </div>
  );
};

export default MyOffer;
