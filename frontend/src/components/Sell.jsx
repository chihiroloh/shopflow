import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const Sell = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="listing" style={{ textAlign: "center" }}>
            <br />
            <h5>List it yourself</h5>
            <p>Find your own buyers</p>

            {/* Green Box with Upload Button */}
            <Card
              style={{
                backgroundColor: "#cce9e4",
                maxWidth: "864px",
                height: "383px",
                padding: "20px",
                marginTop: "15px",
                margin: "auto",
              }}
            >
              <Card.Body>
                <Card.Title>Select Photos</Card.Title>
                <input type="file" className="form-control" multiple />
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Sell;
