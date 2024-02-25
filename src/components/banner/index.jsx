import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner(props) {
  return (
    <div
      style={{
        overflow: "hidden",
        backgroundColor: "#B41712",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}
    >
      <img
        src="../../../public/assets/images/logos/logo_1.jpg"
        alt="Orchid"
        style={{
          float: "left",
          width: "10%",
          height: "100px",
          marginRight: "20px", // Tạo khoảng cách giữa hình ảnh và văn bản
        }}
      />
      <div style={{ width: "90%" }}>
        <div style={{ textAlign: "center" }}>
          <h1>Welcome to Orchid Auction!</h1>
          <p style={{ color: "#ffff" }}>
            As one of the auction houses in Vietnam, Orchid Auction is the unit
            Pioneering the application of information technology in auction
            activities. Orchid Auction is the official online auction organizer
            in Vietnam Nam, on February 15, 2024.
          </p>
        </div>
        <p>
          <Link to={"/auction"}>
            <Button variant="danger">Join the Auction</Button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Banner;
