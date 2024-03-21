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

function CarouselImg(props) {
  const images = [
    "../../../public/assets/images/background/1.jpg",
    "../../../public/assets/images/background/2.jpg",
    "../../../public/assets/images/background/3.jpg",
    "../../../public/assets/images/background/4.jpg",
    "../../../public/assets/images/background/5.jpg",
  ];
  const user = useSelector((state) => state.USER.currentUser);
  return (
    <Container
    //   style={{
    //     margin: "0 20px",
    //   }}
    >
      <Row className="mb-4">
        <Col md={12}>
          {/* <Card>
            <Card.Body> */}
          <Carousel fade>
            {images?.map((image, index) => (
              <Carousel.Item key={index} interval={1500}>
                <img
                  className="d-block"
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    height: "400px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          {/* </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}

export default CarouselImg;
