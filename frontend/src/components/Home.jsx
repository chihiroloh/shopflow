import React from "react";
import bottom from "../assets/bottom.png";
import reviews from "../assets/reviews.png";
import appstore from "../assets/appstore.png";
import car from "../assets/car.png";
import fashion from "../assets/fashion.png";
import electronics from "../assets/electronics.png";
import { Container, Col } from "react-bootstrap";
import "./Module.css";

function Home() {
  const buttonStyle = {
    backgroundColor: "#f0f1f1",
    width: "120px", // Set your desired width
    height: "150px", // Set your desired height
  };

  const buttonContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  const imageStyle = {
    width: "50px",
    marginBottom: "20px", // Add some space between image and text
  };

  return (
    <div>
      <div className="content">
        <Container>
          <div>
            <hr />
            <h3 className="custom-h3">What would you like to find?</h3>
            <br />
            <div className="buttons d-flex justify-content-start">
              <div className="col-4 text-center">
                <button
                  className="btn btn-primary outline-none focus"
                  style={buttonStyle}
                >
                  <div style={buttonContentStyle}>
                    <img
                      src={electronics}
                      alt="Electronics"
                      style={imageStyle}
                    />
                    <span className="text-black">Electronics</span>
                  </div>
                </button>
              </div>
              <div className="col-4 text-center">
                <button
                  className="btn btn-primary outline-none focus"
                  style={buttonStyle}
                >
                  <div style={buttonContentStyle}>
                    <img src={fashion} alt="Fashion" style={imageStyle} />
                    <span className="text-black">Fashion</span>
                  </div>
                </button>
              </div>
            </div>
            <br />
            <br />
            <div>
              <h3 className="custom-h3">Recommended For You</h3>
            </div>
          </div>
        </Container>
      </div>
      <hr />
    </div>
  );
}

export default Home;
