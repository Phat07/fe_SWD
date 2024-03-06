import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Form, Carousel } from "react-bootstrap";
import Header from "../../Header";
import Footer from "../../Footer";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actAuctionGetAsync } from "../../../store/auction/action";
const AuctionDetail = () => {
  const { auctionId } = useParams(); // Lấy ID từ URL
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [stepPrice, setStepPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [auctionInfo, setAuctionInfo] = useState("");
  const [endTime, setEndTime] = useState("");
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();
  const auctions = useSelector((state) => state.AUCTION.auctions);
  console.log("aucctionsss", auctions);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const [auction, setAuction] = useState("");
  useEffect(() => {
    dispatch(actAuctionGetAsync(token));
  }, [auctionId]);
  useEffect(() => {
    const item = auctions.find((i) => i._id === auctionId);
    setAuction(item);
  }, [auctions, auctionId]);
  console.log("auctionDetail", auction);
  // const location = useLocation();
  // const userEditData = useMemo(
  //   () => location.state?.userEditData || {},
  //   [location.state?.userEditData]
  // );
  const images = [
    "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8w6TKU8zvTgVk38Cdw2pMddLsJGvlEi5ZQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hb_Fnt1hatRzXyvhGMBnf0VNWeB1QwPPMQ&usqp=CAU",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log({
      productName,
      description,
      startingPrice,
      startTime,
      endTime,
      productImage,
    });
    // Ideally, here you would send the data to your backend or state management store
  };
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}></div>
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Header>
                <strong>Thông Tin Chi Tiết Autionn với ID {auctionId} </strong>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Ảnh Sản Phẩm</Card.Title>
                          <Carousel>
                            {auction?.product_id?.image?.map((image, index) => (
                              <Carousel.Item key={index}>
                                <img
                                  className="d-block w-100"
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
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Video Sản Phẩm</Card.Title>
                          <div
                            style={{ position: "relative", marginTop: "20px" }}
                          >
                            <video controls style={{ maxWidth: "100%" }}>
                              <source
                                src={auction?.product_id?.video}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Thông Tin Sản Phẩm</Card.Title>
                          <Form.Group className="mb-3">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập tên sản phẩm"
                              // disabled ={auctionId} 
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Mô tả sản phẩm"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Giá khởi điểm</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Giá khởi điểm"
                              value={startingPrice}
                              onChange={(e) => setStartingPrice(e.target.value)}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Thông Tin Auction</Card.Title>
                          <Form.Group className="mb-3">
                            <Form.Label>Thong tin dau gia</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Thông tin đấu giá"
                              value={auctionInfo}
                              onChange={(e) => setAuctionInfo(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Bước giá tối thiểu</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Minimun Price Step"
                              value={stepPrice}
                              onChange={(e) => setStepPrice(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian bắt đầu dang ki</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              defaultValue={endTime}
                              onChange={(e) => setStartTime(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian kết thúc dang ki</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              defaultValue={endTime}
                              onChange={(e) => setEndTime(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian bắt đầu</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              defaultValue={startTime}
                              onChange={(e) => setStartTime(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian kết thúc</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              defaultValue={endTime}
                              onChange={(e) => setEndTime(e.target.value)}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs="auto" className="mt-2">
                      <Button variant="primary" type="submit" className="me-2">
                        Create Auction
                      </Button>
                      <Button
                        variant="danger"
                        type="submit"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default AuctionDetail;
