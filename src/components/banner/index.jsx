import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Carousel,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Banner(props) {
  const images = [
    "../../../public/assets/images/background/background1.jpg",
    "../../../public/assets/images/background/background2.jpg",
    "../../../public/assets/images/background/background3.jpg",
    "../../../public/assets/images/background/background4.jpg",
    "../../../public/assets/images/background/background5.jpg",
  ];
  const user = useSelector((state) => state.USER.currentUser);
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
            Chào mừng đến với cuộc đấu giá hoa lan!
          </h1>
          <p style={{ color: "#fff", textAlign:"center" }}>
            Là một trong những nhà đấu giá tại Việt Nam, Orchid Auction là đơn
            vị tiên phong ứng dụng công nghệ thông tin trong đấu giá các hoạt
            động. Orchid Auction là nhà tổ chức đấu giá trực tuyến chính thức
            tại Việt Nam, ngày 15 tháng 2 năm 2024.
          </p>
        </Col>
        {user?.role_id?.title === "HOST" ? (
          ""
        ) : (
          <div style={{ textAlign: "left" }}>
            {/* <Link to="/room-auction">
              <Button variant="danger">Join the Auction</Button>
            </Link> */}
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Banner;
