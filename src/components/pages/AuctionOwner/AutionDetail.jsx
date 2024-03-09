import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Form, Carousel } from "react-bootstrap";
import Header from "../../Header";
import Footer from "../../Footer";
import { useDispatch, useSelector } from "react-redux";
import { actAuctionGetAsync } from "../../../store/auction/action";
const AuctionDetail = () => {
  const { auctionId } = useParams(); // Lấy ID từ URL
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
                <Form>
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
                              readOnly={auctionId}
                              value={auction?.product_id?.name}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Mô tả sản phẩm"
                              readOnly={auctionId}
                              value={auction?.product_id?.description}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Giá khởi điểm</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Giá khởi điểm"
                              readOnly={auctionId}
                              value={auction?.starting_price}
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
                              readOnly={auctionId}
                              rows={3}
                              placeholder="Thông tin đấu giá"
                              value={auction?.auctionInfo}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Bước giá tối thiểu</Form.Label>
                            <Form.Control
                              type="number"
                              readOnly={auctionId}
                              placeholder="Minimun Price Step"
                              value={auction?.minimum_price_step}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian bắt đầu đăng kí</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              readOnly={auctionId}
                              value={
                                auction?.regitration_start_time
                                  ? auction.regitration_start_time.substring(
                                      0,
                                      16
                                    )
                                  : ""
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian kết thúc đăng kí</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              readOnly={auctionId}
                              value={
                                auction?.regitration_end_time
                                  ? auction.regitration_end_time.substring(
                                      0,
                                      16
                                    )
                                  : ""
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian bắt đầu</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              readOnly={auctionId}
                              value={
                                auction?.start_time
                                  ? auction.start_time.substring(0, 16)
                                  : ""
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian kết thúc</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              readOnly={auctionId}
                              value={
                                auction?.end_time
                                  ? auction.end_time.substring(0, 16)
                                  : ""
                              }
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs="auto" className="mt-2">
                      <Button variant="success" onClick={() => navigate(-1)}>
                        Back
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
