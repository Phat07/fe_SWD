import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Form, Carousel } from 'react-bootstrap';
import Header from "../../Header";
import Footer from "../../Footer";
const AuctionDetail = () => {
  const { auctionId } = useParams(); // Lấy ID từ URL
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();
  // const location = useLocation();
  // const userEditData = useMemo(
  //   () => location.state?.userEditData || {},
  //   [location.state?.userEditData]
  // );
  const images = [
    "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8w6TKU8zvTgVk38Cdw2pMddLsJGvlEi5ZQ&usqp=CAU", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hb_Fnt1hatRzXyvhGMBnf0VNWeB1QwPPMQ&usqp=CAU",
]
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
            <strong>
              Thông Tin Chi Tiết Autionn với ID {auctionId}{" "}
            </strong>
          </Card.Header>
          <Card.Body>
          <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={6}>
            <Card>
            <Carousel>
                        {images.map((image, index) => (
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
                  <Form.Control type="datetime-local" defaultValue={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Thời gian kết thúc</Form.Label>
                  <Form.Control type="datetime-local" defaultValue={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </Form.Group>
              </Card.Body>
            </Card>
            <Col xs="auto" className='mt-2'>              
                <Button variant="primary" type="submit" className="me-2">
                  Update Auction
                </Button>
                <Button variant="danger" type="submit" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Col>
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
