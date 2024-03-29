// import React from 'react';
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

import Header from "../Header";
import Footer from "../Footer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actPostWalletUserByIdAsync } from "../../store/wallet/action";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { QRCodeSVG } from "qrcode.react";
function PaidItem() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const user = useSelector((state) => state.USER.currentUser);
 
  const [addMoney, setAddMoney] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    // customerName: "Nguyễn Văn A",
    // description: "Thanh toán đơn hàng #1234",
    amount: 0, // Lưu trữ dưới dạng số để dễ dàng thực hiện các phép toán
    // transferContent: "Thanh toan don hang 1234",
  });
  const qrData = "https://me.momo.vn/MRIBTQtPfesBuWuEi7i5TE";
  const handleAddToCard = (money) => {
    // Chuyển đổi chuỗi sang số trước khi format
    const amountNumber = parseFloat(money);
    if (!isNaN(amountNumber)) {
      const formattedMoney = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amountNumber);

      const data = { ...paymentInfo, amount: formattedMoney };
      setPaymentInfo(data);
    } else {
      // Xử lý trường hợp không phải là số
      console.error("Giá trị nhập không phải là số.");
    }
  };
  // function handleSubmit() {
  //   if (addMoney && parseFloat(addMoney) >= 20000) {
  //     let data = {
  //       user_id: user?._id,
  //       type_report: "money",
  //       description: `${user?.username} - ${addMoney}`,
  //       note: "",
  //     };

  //     dispatch(actPostWalletUserByIdAsync(data, token)).then(() => {
  //       setAddMoney("");
  //       setPaymentInfo({ ...paymentInfo, amount: 0 });
  //     });
  //   } else {
  //     // alert("Vui lòng nhập số tiền hợp lệ để nạp vào ví.");
  //     toast.error("Vui lòng nhập số tiền hợp lệ để nạp vào ví.");
  //   }
  // }
  function handleSubmit() {
    if (addMoney && parseFloat(addMoney) >= 20000) {
      let data = {
        user_id: user?._id,
        type_report: "money",
        description: `${user?.username} - ${addMoney}`,
        note: "",
      };

      dispatch(actPostWalletUserByIdAsync(data, token)).then(() => {
        setAddMoney("");
        // setPaymentInfo({ ...paymentInfo, amount: 0 });
        setShowModal(true); // Show the modal after successful submission
      });
    } else {
      toast.error("Vui lòng nhập số tiền hợp lệ để nạp vào ví.");
    }
  }

  return (
    // <div className="app-container">
    //   <div className="header-container">
    //     <Header />
    //   </div>
    <div className="body-container">
      <div className="container" style={{ marginBottom: "20px" }}>
        <Container>
          <Row className="justify-content-md-center" mb={4}>
            <Col xs={12} md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Nạp tiền vào Ví </Card.Title>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Số tiền nạp vào ví phải lớn hơn 20,000đ
                    </Form.Label>
                    {/* <Form.Control
                      type="number"
                      placeholder="Số tiền nạp vào"
                      value={addMoney}
                      // onChange={handlePriceChange}
                      onChange={(e) => setAddMoney(e.target.value)}
                    /> */}
                    <Form.Control
                      as={CurrencyFormat}
                      thousandSeparator={true}
                      decimalSeparator="."
                      allowNegative={false}
                      placeholder="Nhập số tiền đấu giá"
                      value={addMoney}
                      onValueChange={(values) => {
                        const { value } = values;
                        setAddMoney(value);
                      }}
                      suffix=" đ"
                    />
                  </Form.Group>
                  <Button
                    color="primary"
                    md={2}
                    onClick={() => handleAddToCard(parseFloat(addMoney))}
                  >
                    Add to card
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Thông Tin Thanh Toán</Card.Title>
                  <Card.Text>Tên khách hàng: {user.fullName}</Card.Text>
                  {/* <Card.Text>Miêu tả: {user.address}</Card.Text> */}
                  <Card.Text>Số tiền: {paymentInfo.amount}</Card.Text>
                  <Card.Text>
                    Nội dung chuyển khoản: <strong>{user.username}</strong> -{" "}
                    <strong>{paymentInfo.amount}</strong>
                  </Card.Text>
                  <Button
                    color="primary"
                    md={2}
                    // onClick={() => navigate("/payment")}
                    onClick={handleSubmit}
                  >
                    Submit Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Modal for QR Code and Payment Info */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          // Reset thông tin thanh toán khi đóng Modal
          setPaymentInfo({ ...paymentInfo, amount: 0 });
        }}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Mã QR Thanh Toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12} md={3}>
                <Card>
                  <Card.Body>
                    <div className="text-center">
                      <QRCodeSVG value={qrData} size={200} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={9}>
                <Card>
                  <Card.Body>
                    <Card.Title>Thông Tin Thanh Toán</Card.Title>
                    <Card.Text>Tên khách hàng: {user.fullName}</Card.Text>
                    <Card.Text>Số tiền: {paymentInfo.amount}</Card.Text>
                    <Card.Text>
                      Nội dung chuyển khoản: <strong>{user.username}</strong> -{" "}
                      <strong>{paymentInfo.amount}</strong>
                    </Card.Text>
                    {/* <Button
                      color="primary"
                      onClick={() => setShowModal(false)}
                      md={2}
                    >
                      Quay Lại
                    </Button> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
    //   <div className="footer-container">
    //     <Footer />
    //   </div>
    // </div>
  );
}

export default PaidItem;
