import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
function CreateAuctionProductForm() {
  // State for form fields

  // function formatPrice(value) {
  //   // Xóa tất cả ký tự không phải số và chuyển đổi sang số nguyên
  //   let number = parseInt(value.replace(/\D/g, ""), 10);

  //   // Kiểm tra nếu không phải là số thì trả về chuỗi rỗng
  //   if (isNaN(number)) {
  //     return "";
  //   }

  //   // Format số theo dạng có dấu chấm phân cách hàng nghìn
  //   let formattedNumber = number.toLocaleString();

  //   // Trả về giá trị đã format và thêm "đ" vào cuối
  //   return `${formattedNumber}đ`;
  // }

  // function unformatPrice(formattedValue) {
  //   // Loại bỏ ký tự "đ" và dấu chấm phân cách hàng nghìn
  //   let numberString = formattedValue.replace(/đ/g, "").replace(/\./g, "");

  //   // Chuyển đổi chuỗi thành số
  //   let number = parseInt(numberString, 10);

  //   // Kiểm tra nếu kết quả là NaN thì trả về 0 hoặc trả về số
  //   return isNaN(number) ? 0 : number;
  // }

  const [auctionInfo, setAuctionInfo] = useState("");
  const [stepPrice, setStepPrice] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // const [formattedStartingPrice, setFormattedStartingPrice] = useState("");
  // const [formattedStepPrice, setFormattedStepPrice] = useState("");

  // const handleStartingPriceChange = (e) => {
  //   const unformattedValue = unformatPrice(e.target.value); // Chuyển đổi giá trị nhập vào sang số
  //   setStartingPrice(unformattedValue); // Cập nhật state của giá trị số
  //   setFormattedStartingPrice(formatPrice(unformattedValue.toString())); // Cập nhật state của giá trị được format để hiển thị
  //   console.log("Start: ", startingPrice);
  // };

  // const handleStepPriceChange = (e) => {
  //   const value = e.target.value;
  //   setStepPrice(value); // Tương tự như trên
  //   setFormattedStepPrice(formatPrice(value));
  // };

  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log({
      startTime,
      endTime,
    });
    // Ideally, here you would send the data to your backend or state management store
  };

  // Calculate default start and end times for auction
  const defaultStartTime = new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, 16); // 1 week from now
  const defaultEndTime = new Date(
    new Date().getTime() + 14 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, 16); // 2 weeks from now
  const defaultRegisterStartTime = new Date(new Date().getTime())
    .toISOString()
    .slice(0, 16); // 1 week from now
  const defaultRegisterEndTime = new Date(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .slice(0, 16); // 2 weeks from now
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
                    {/* <Form.Group className="mb-3">
                      <Form.Label>Giá khởi điểm</Form.Label>
                      <Form.Control
                        type="text" // Sử dụng type="text" để cho phép format
                        placeholder="Giá khởi điểm"
                        value={formattedStartingPrice}
                        onChange={handleStartingPriceChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Bước giá tối thiểu</Form.Label>
                      <Form.Control
                        type="text" // Tương tự như trên
                        placeholder="Minimun Price Step"
                        value={formattedStepPrice}
                        onChange={handleStepPriceChange}
                      />
                    </Form.Group> */}
                    <Form.Group className="mb-3">
                      <Form.Label>Giá khởi điểm</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Giá khởi điểm"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
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
                        defaultValue={defaultRegisterStartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian kết thúc dang ki</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        defaultValue={defaultRegisterEndTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian bắt đầu</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        defaultValue={defaultStartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian kết thúc</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        defaultValue={defaultEndTime}
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
        </Container>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default CreateAuctionProductForm;
