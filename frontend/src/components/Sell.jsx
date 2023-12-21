import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import NavBar from "./NavBar";
import { Container, Form, Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./Module.css";

const Sell = () => {
  const userCtx = useContext(UserContext);
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [listings, setListings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

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

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      // // Remove the listing after an hour
      // setTimeout(() => {
      //   setListings((prevListings) =>
      //     prevListings.filter(
      //       (listing) => listing._id !== timestampedListing._id
      //     )
      //   );
      // }, 3600000); // 3600000 milliseconds = 1 hour
      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/mylisting"); // Navigate to /mylisting
        }, 2000); // Assuming you still want to show the success message for 3 seconds
      }
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
        {showPopup && (
          <div className="alert alert-success">
            Listing created successfully!
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow" id="long-card">
              <div className="card-body">
                <h2 className="text-center">Create a New Listing</h2>
                <form onSubmit={handleSubmit}>
                  {/* Title Field */}
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Row>
                      <Col sm={12}>
                        <Form.Label className="text-sm-start">Title</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Form.Control
                          type="text"
                          name="title"
                          value={newListing.title}
                          onChange={handleInputChange}
                          placeholder="Title"
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  {/* Description Field */}
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Row>
                      <Col sm={12}>
                        <Form.Label className="text-sm-start">
                          Description
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="description"
                          value={newListing.description}
                          onChange={handleInputChange}
                          placeholder="Description"
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  {/* Price Field */}
                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Row>
                      <Col sm={12}>
                        <Form.Label className="text-sm-start">Price</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Form.Control
                          type="number"
                          name="price"
                          value={newListing.price}
                          onChange={handleInputChange}
                          placeholder="Price"
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  {/* Category Field */}
                  <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Row>
                      <Col sm={12}>
                        <Form.Label className="text-sm-start">
                          Category
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <Form.Select
                          name="category"
                          value={newListing.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Fashion">Fashion</option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  {/* Submit Button */}
                  <Row>
                    <Col sm={12} className="d-flex justify-content-center">
                      <button
                        type="submit"
                        id="btn-update"
                        className="btn btn-outline-success"
                      >
                        Create Listing
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <br />
      <Footer />
    </div>
  );
};

export default Sell;
