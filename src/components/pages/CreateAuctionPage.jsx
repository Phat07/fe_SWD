import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Header from "../Header";
import Footer from "../Footer";
function CreateAuctionProductForm() {
  // State for form fields
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [productImage, setProductImage] = useState(null);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log({
      productName,
      description,
      startingPrice,
      startTime,
      endTime,
      productImage
    });
    // Ideally, here you would send the data to your backend or state management store
  };

  // Calculate default start and end times for auction
  const defaultStartTime = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16); // 1 week from now
  const defaultEndTime = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16); // 2 weeks from now

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
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Upload Ảnh Sản Phẩm</Card.Title>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Chọn ảnh sản phẩm</Form.Label>
                  <Form.Control type="file" onChange={(e) => setProductImage(e.target.files[0])} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Thông Tin Sản Phẩm</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control type="text" placeholder="Nhập tên sản phẩm" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Mô tả sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Thông Tin Auction</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Giá khởi điểm</Form.Label>
                  <Form.Control type="number" placeholder="Giá khởi điểm" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Thời gian bắt đầu</Form.Label>
                  <Form.Control type="datetime-local" defaultValue={defaultStartTime} onChange={(e) => setStartTime(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Thời gian kết thúc</Form.Label>
                  <Form.Control type="datetime-local" defaultValue={defaultEndTime} onChange={(e) => setEndTime(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Tạo Sản Phẩm
                </Button>
              </Card.Body>
            </Card>
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
