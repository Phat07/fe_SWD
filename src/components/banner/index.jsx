import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner(props) {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#B41712",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <Row>
        <Col xs={2} md={1} lg={1}>
          <Image
            src="../../../public/assets/images/logos/logo_1.jpg"
            alt="Orchid"
            style={{ width: "100%", height: "auto" }}
            rounded
          />
        </Col>
        <Col xs={10} md={11} lg={11}>
          <h1 style={{ color: "#fff", textAlign: "center" }}>
            Welcome to Orchid Auction!
          </h1>
          <p style={{ color: "#fff" }}>
            As one of the auction houses in Vietnam, Orchid Auction is the unit
            pioneering the application of information technology in auction
            activities. Orchid Auction is the official online auction organizer
            in Vietnam, on February 15, 2024.
          </p>
        </Col>
        <div style={{ textAlign: "left" }}>
          <Link to="/room-auction">
            <Button variant="danger">Join the Auction</Button>
          </Link>
        </div>
      </Row>
    </Container>
  );
}

export default Banner;
