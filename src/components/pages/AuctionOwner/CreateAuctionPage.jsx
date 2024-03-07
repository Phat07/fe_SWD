import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import Header from "../../Header";
import Footer from "../../Footer";
import { actAuctionPostAsync } from "../../../store/auction/action";
import moment from "moment/moment";
import { toast } from "react-toastify";
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

    if (
      !auctionInfo ||
      !stepPrice ||
      !startingPrice ||
      !regitrationStartTime ||
      !regitrationEndTime ||
      !startTime ||
      !endTime
    ) {
      // alert("Vui lòng điền tất cả các trường trong form!");
      toast.error("Vui lòng điền tất cả các trường trong form!");
      return;
    }

    // Chuyển đổi chuỗi thời gian thành đối tượng Date để so sánh
    const regStart = new Date(regitrationStartTime);
    const regEnd = new Date(regitrationEndTime);
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Kiểm tra các điều kiện thời gian
    if (regStart >= regEnd) {
      alert(
        "Thời gian bắt đầu đăng ký phải nhỏ hơn thời gian kết thúc đăng ký!"
      );
      return;
    }

    if (regEnd >= start) {
      alert(
        "Thời gian kết thúc đăng ký phải nhỏ hơn thời gian bắt đầu đấu giá!"
      );
      return;
    }

    if (start >= end) {
      alert(
        "Thời gian bắt đầu đấu giá phải nhỏ hơn thời gian kết thúc đấu giá!"
      );
      return;
    }

    let data = {
      // Khai báo và sử dụng data như trước
      starting_price: startingPrice,
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

    // Gửi dữ liệu đi như bình thường sau khi tất cả các điều kiện kiểm tra đã được thông qua
    dispatch(actAuctionPostAsync(data, token));

    // Reset form sau khi gửi thành công
    setAuctionInfo("");
    setStartingPrice("");
    setStepPrice("");
    setRegitrationStartTime("");
    setRegitrationEndTime("");
    setStartTime("");
    setEndTime("");

    // Điều hướng người dùng
    navigate("/manage-auction");
  };

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
                        // defaultValue={defaultRegisterStartTime}
                        onChange={(e) =>
                          setRegitrationStartTime(e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian kết thúc dang ki</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        // defaultValue={defaultRegisterEndTime}
                        onChange={(e) => setRegitrationEndTime(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian bắt đầu</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        // defaultValue={defaultStartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thời gian kết thúc</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        // defaultValue={defaultEndTime}
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
                <Button variant="danger" onClick={() => navigate(-1)}>
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
