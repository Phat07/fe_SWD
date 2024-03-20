// import React from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import Header from "../Header";
import Footer from "../Footer";
function Payment() {
  const navigate = useNavigate();
  const paymentInfo = {
    customerName: "Nguyễn Văn A",
    description: "Thanh toán đơn hàng #1234",
    amount: "1,500,000 VND",
    transferContent: "Thanh toan don hang 1234",
  };
  const qrData = "https://me.momo.vn/MRIBTQtPfesBuWuEi7i5TE";
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12} md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>Mã QR Thanh Toán</Card.Title>
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
                    <Card.Text>
                      Tên khách hàng: {paymentInfo.customerName}
                    </Card.Text>
                    <Card.Text>Miêu tả: {paymentInfo.description}</Card.Text>
                    <Card.Text>Số tiền: {paymentInfo.amount}</Card.Text>
                    <Card.Text>
                      Nội dung chuyển khoản: {paymentInfo.transferContent}
                    </Card.Text>
                    <Button color="primary" onClick={() => navigate(-1)} md={2}>
                      Quay Lại
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Payment;
