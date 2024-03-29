import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { Image, Modal } from "react-bootstrap";

import socketIOClient from "socket.io-client";
import Header from "../../Header";
import Footer from "../../Footer";
import { actAuctionPostAsync } from "../../../store/auction/action";
import moment from "moment/moment";
import { Spinner } from "react-bootstrap";

import "../../../css/createAuction.css";

import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { actMoneyCofigGetAsync } from "../../../store/moneyConfig/action";
function CreateAuctionProductForm() {
  const [auctionInfo, setAuctionInfo] = useState("");
  const [stepPrice, setStepPrice] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [regitrationStartTime, setRegitrationStartTime] = useState("");
  const [regitrationEndTime, setRegitrationEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [startingPriceError, setStartingPriceError] = useState("");
  const [stepPriceError, setStepPriceError] = useState("");
  const param = useParams();
  const productId = param.productID;
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.USER.currentUser);
  const navigate = useNavigate();
  const conFigMoney = useSelector((state) => state.MONEYCONFIG.configMoney);
  const joinAuctionConfig = conFigMoney?.find(
    (config) => config.type_config === "Create auction"
  );
  useEffect(() => {
    dispatch(actMoneyCofigGetAsync(token));
  }, []);
  const handleStartingPriceChange = (e) => {
    const value = e;
    setStartingPrice(value); // Cập nhật giá trị nhập vào mỗi lần thay đổi

    // Kiểm tra điều kiện và cập nhật lỗi nếu có
    const valueNumber = Number(value);
    if (valueNumber < 1000 || valueNumber % 1000 !== 0) {
      setStartingPriceError(
        "Giá khởi điểm phải lớn hơn 1000 và chia hết cho 1000."
      );
    } else {
      setStartingPriceError(""); // Xóa thông báo lỗi nếu giá trị hợp lệ
    }
  };

  // Hàm xử lý thay đổi cho Bước giá tối thiểu
  const handleStepPriceChange = (e) => {
    const value = e;
    setStepPrice(value); // Cập nhật giá trị nhập vào mỗi lần thay đổi

    // Kiểm tra điều kiện và cập nhật lỗi nếu có
    const valueNumber = Number(value);
    if (valueNumber < 1000 || valueNumber % 1000 !== 0) {
      setStepPriceError(
        "Bước giá tối thiểu phải lớn hơn 1000 và chia hết cho 1000."
      );
    } else {
      setStepPriceError(""); // Xóa thông báo lỗi nếu giá trị hợp lệ
    }
  };
  // Handle form submit
  const handleSubmit = (e) => {
    // e.preventDefault();

    if (
      !auctionInfo ||
      !stepPrice ||
      !startingPrice ||
      !regitrationStartTime ||
      !regitrationEndTime ||
      !startTime ||
      !endTime
    ) {
      toast.error("Vui lòng điền tất cả các trường trong form!");
      return;
    }

    // Chuyển đổi chuỗi thời gian thành đối tượng Date để so sánh
    const regStart = new Date(regitrationStartTime);
    const regEnd = new Date(regitrationEndTime);
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    // Kiểm tra các điều kiện thời gian
    if (regStart < now) {
      toast.error("Thời gian bắt đầu đăng ký không được trong quá khứ!");
      return;
    }

    if (regEnd < now) {
      toast.error("Thời gian kết thúc đăng ký không được trong quá khứ!");
      return;
    }

    if (start < now) {
      toast.error("Thời gian bắt đầu đấu giá không được trong quá khứ!");
      return;
    }

    if (end < now) {
      toast.error("Thời gian kết thúc đấu giá không được trong quá khứ!");
      return;
    }
    // Kiểm tra các điều kiện thời gian
    if (regStart >= regEnd) {
      toast.error(
        "Thời gian bắt đầu đăng ký phải trước thời gian kết thúc đăng ký!"
      );
      return;
    }

    if (regEnd >= start) {
      toast.error(
        "Thời gian kết thúc đăng ký phải trước thời gian bắt đầu đấu giá!"
      );
      return;
    }

    if (start >= end) {
      toast.error(
        "Thời gian bắt đầu đấu giá phải trước thời gian kết thúc đấu giá!"
      );
      return;
    }

    let data = {
      // Khai báo và sử dụng data như trước
      starting_price: startingPrice,
      price_step: stepPrice,
      auctionInfo: auctionInfo,
      start_time: startTime,
      end_time: endTime,
      regitration_start_time: regitrationStartTime,
      regitration_end_time: regitrationEndTime,
      status: "not",
      host_id: user?._id,
      product_id: productId,
    };
    setIsSubmitting(true);
    setShowModal(false); // Đóng Modal ở đây
    // Gửi dữ liệu đi như bình thường sau khi tất cả các điều kiện kiểm tra đã được thông qua
    dispatch(actAuctionPostAsync(data, token)).then(() => {
      setIsSubmitting(false);
      setAuctionInfo("");
      setStartingPrice("");
      setStepPrice("");
      setRegitrationStartTime("");
      setRegitrationEndTime("");
      setStartTime("");
      setEndTime("");
    });
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  function formatCurrencyVND(amount) {
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}></div>
        <Container>
          <h1>Tạo buổi đấu giá</h1>
          {/* <Form> */}
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
                      as={CurrencyFormat}
                      thousandSeparator={true}
                      decimalSeparator="."
                      allowNegative={false}
                      placeholder="Giá khởi điểm"
                      value={startingPrice}
                      onValueChange={(values) => {
                        const { value } = values;
                        setStartingPrice(value);
                        handleStartingPriceChange(value);
                      }}
                      suffix=" đ"
                    />
                    {startingPriceError && (
                      <div className="text-danger">{startingPriceError}</div>
                    )}
                    {/* <Form.Control
                        type="number"
                        placeholder="Giá khởi điểm"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                      /> */}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bước giá tối thiểu</Form.Label>
                    {/* <Form.Control
                        type="number"
                        placeholder="Minimun Price Step"
                        value={stepPrice}
                        onChange={(e) => setStepPrice(e.target.value)}
                      /> */}
                    <Form.Control
                      as={CurrencyFormat}
                      thousandSeparator={true}
                      decimalSeparator="."
                      allowNegative={false}
                      placeholder="Minimun Price Step"
                      value={stepPrice}
                      onValueChange={(values) => {
                        const { value } = values;
                        setStepPrice(value);
                        handleStepPriceChange(value);
                      }}
                      suffix=" đ"
                    />
                    {stepPriceError && (
                      <div className="text-danger">{stepPriceError}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Thời gian bắt đầu dang ki</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      // defaultValue={defaultRegisterStartTime}
                      onChange={(e) => setRegitrationStartTime(e.target.value)}
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
              <Button
                variant="primary"
                type="submit"
                className="me-2"
                onClick={handleOpenModal}
              >
                Create Auction
              </Button>
              <Button variant="danger" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Col>
          </Row>
          {/* </Form> */}
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận tạo đấu giá</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có muốn tạo đấu giá với mức phí là{" "}
            {formatCurrencyVND(joinAuctionConfig?.money)}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
        {isSubmitting ? (
          <>
            <div className="overlay1"></div>
            <div className="spinner-container1">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default CreateAuctionProductForm;
