import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../css/productList.css";

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$10",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Product 2",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$15",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Product 3",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$10",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    name: "Product 4",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$15",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    name: "Product 5",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$10",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    name: "Product 6",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$15",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 7,
    name: "Product 7",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$10",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 8,
    name: "Product 8",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$15",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 9,
    name: "Product 9",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$10",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 10,
    name: "Product 10",
    image: "../../../public/assets/images/background/background2.jpg",
    price: "$15",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  // Add more products here
];

const ProductList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Container>
      <Row
        className="justify-content-center text-center"
        style={{ marginBottom: "20px" }}
      >
        <Col xs={12} md={8}>
          <h2>Tài sản sắp được đấu giá</h2>
        </Col>
      </Row>
      <Slider {...settings}>
        {/* <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={true}
        // infiniteLoop={true}
        emulateTouch={true}
        // dynamicHeight={true}
        autoPlay={false}
        interval={3000}
        stopOnHover={true}
      > */}
        {products.map((product) => (
          <div key={product.id} className="product-card-container" style={{marginRight:"10px"}}>
            <Card.Title style={{ marginBottom: "1rem", textAlign: "center" }}>
              <span className="timer-title">Thời gian đấu giá</span>
              <span style={{ fontWeight: "700" }}>20:31:26 22/03/2024</span>
            </Card.Title>
            <Card className="mb-3 product-card">
              <Card.Img
                className="product-image"
                variant="top"
                src={product.image}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <p className="price">Gía khởi điểm : <span style={{fontWeight:"800", color:"black"}}>1.680.000 VNĐ</span></p>
                <Button variant="danger">View Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
        {/* </Carousel> */}
      </Slider>
    </Container>
  );
};

// Function to split array into chunks
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
export default ProductList;
