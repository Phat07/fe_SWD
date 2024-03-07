// import React from 'react';
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import React, { useState } from "react";
function PaidItem() {
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
  const [addMoney, setAddMoney] = useState("");
  // const [formattedPrice, setFormattedPrice] = useState("");

  // const handlePriceChange = (e) => {
  //   const value = e.target.value;
  //   const amountNumber = parseFloat(value);
  //   if (!isNaN(amountNumber)) {
  //     const formattedMoney = new Intl.NumberFormat("vi-VN", {
  //       style: "currency",
  //       currency: "VND",
  //     }).format(amountNumber);

  //     setAddMoney(amountNumber); // Giữ nguyên giá trị số để xử lý logic nếu cần
  //     setFormattedPrice(formattedMoney); // Format giá trị để hiển thị
  //   } else {
  //     // Xử lý trường hợp không phải là số
  //     console.error("Giá trị nhập không phải là số.");
  //   }
  //   console.log("Monney add:", addMoney);
  // };
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    customerName: "Nguyễn Văn A",
    description: "Thanh toán đơn hàng #1234",
    amount: 0, // Lưu trữ dưới dạng số để dễ dàng thực hiện các phép toán
    transferContent: "Thanh toan don hang 1234",
  });

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
                    <Form.Label>Số tiền nạp vào Ví</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Số tiền nạp vào"
                      value={addMoney}
                      // onChange={handlePriceChange}
                      onChange={(e) => setAddMoney(e.target.value)}
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
                  <Card.Text>
                    Tên khách hàng: {paymentInfo.customerName}
                  </Card.Text>
                  <Card.Text>Miêu tả: {paymentInfo.description}</Card.Text>
                  <Card.Text>Số tiền: {paymentInfo.amount}</Card.Text>
                  <Card.Text>
                    Nội dung chuyển khoản: {paymentInfo.transferContent}
                  </Card.Text>
                  <Button
                    color="primary"
                    md={2}
                    onClick={() => navigate("/payment")}
                  >
                    Submit Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    //   <div className="footer-container">
    //     <Footer />
    //   </div>
    // </div>
  );
}

export default PaidItem;
