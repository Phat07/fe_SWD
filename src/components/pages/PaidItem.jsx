// import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import React, { useState } from 'react';
function PaidItem() {
    const [addMonney, setAddMoney] = useState('');
    const navigate = useNavigate();
    const paymentInfo = {
        customerName: 'Nguyễn Văn A',
        description: 'Thanh toán đơn hàng #1234',
        amount: '1,500,000 VND',
        transferContent: 'Thanh toan don hang 1234'
      };
    return (
      <div className="app-container">
        <div className="header-container">
          <Header />
        </div>
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
                  <Form.Control type="number" placeholder="Giá khởi điểm" value={addMonney} onChange={(e) => setAddMoney(e.target.value)} />
                </Form.Group>
            <Button color="primary" md={2}>
              Add to card
            </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Thông Tin Thanh Toán</Card.Title>
              <Card.Text>Tên khách hàng: {paymentInfo.customerName}</Card.Text>
              <Card.Text>Miêu tả: {paymentInfo.description}</Card.Text>
              <Card.Text>Số tiền: {paymentInfo.amount}</Card.Text>
              <Card.Text>Nội dung chuyển khoản: {paymentInfo.transferContent}</Card.Text>
              <Button color="primary" md={2} onClick={() => navigate("/payment")}>
              Submit Order
            </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button color="primary" onClick={() => navigate(-1)}>
            Quay Lại
        </Button>
    </Container>
    </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    );
  }

export default PaidItem;