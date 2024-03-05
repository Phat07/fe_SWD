import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Header";
import Footer from "../../Footer";
import { actAuctionPostAsync } from "../../../store/auction/action";
import moment from "moment/moment";
function CreateAuctionProductForm() {
  // State for form fields
  const [auctionInfo, setAuctionInfo] = useState("");
  const [stepPrice, setStepPrice] = useState("");
  const [regitrationStartTime, setRegitrationStartTime] = useState("");
  const [regitrationEndTime, setRegitrationEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const param = useParams();
  const productId = param.productID;
  const token = localStorage.getItem("ACCESS_TOKEN");
  console.log("productId", productId);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  const navigate = useNavigate();
  // chưa đấu giá
  // sắp đấu giá
  // đang đấu giá
  // đã đấu giá
  // not yet auctioned
  // about to auction
  // auctioning
  // auctioned

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    // Logic to handle form submission
    let data = {
      minimum_price_step: stepPrice,
      auctionInfo: auctionInfo,
      start_time: startTime,
      end_time: endTime,
      regitration_start_time: regitrationStartTime,
      regitration_end_time: regitrationEndTime,
      status: "not yet auctioned",
      host_id: user?._id,
      product_id: productId,
    };
    dispatch(actAuctionPostAsync(data, token));
    setAuctionInfo("");
    setStepPrice("");
    setRegitrationStartTime("");
    setRegitrationEndTime("");
    setStartTime("");
    setEndTime("");
    navigate("/manage-auction");
    console.log({
      startTime,
      endTime,
    });
    // Ideally, here you would send the data to your backend or state management store
  };

  // Calculate default start and end times for auction
  // const defaultStartTime = new Date(
  //   new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  // )
  //   .toISOString()
  //   .slice(0, 16); // 1 week from now
  // const defaultEndTime = new Date(
  //   new Date().getTime() + 14 * 24 * 60 * 60 * 1000
  // )
  //   .toISOString()
  //   .slice(0, 16); // 2 weeks from now
  // const defaultRegisterStartTime = new Date(new Date().getTime())
  //   .toISOString()
  //   .slice(0, 16); // 1 week from now
  // const defaultRegisterEndTime = new Date(
  //   new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  // )
  //   .toISOString()
  //   .slice(0, 16); // 2 weeks from now
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}></div>
        <Container>
          <h1>Tạo buổi đấu giá</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
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
                        // defaultValue={defaultRegisterStartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian kết thúc dang ki</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        // defaultValue={defaultRegisterEndTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian bắt đầu</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        // defaultValue={defaultStartTime}
                        onChange={(e) =>
                          setRegitrationStartTime(e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian kết thúc</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        // defaultValue={defaultEndTime}
                        onChange={(e) => setRegitrationEndTime(e.target.value)}
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
        </Container>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default CreateAuctionProductForm;
