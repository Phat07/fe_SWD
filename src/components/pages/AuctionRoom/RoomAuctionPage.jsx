import { useState } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, FormControl, Carousel } from 'react-bootstrap';
// Giả sử bạn đã có Header và Footer component, nếu không, bạn cần tạo hoặc bỏ qua phần import này
import Header from "../../Header";
import Footer from "../../Footer";
import ModalConfirmJoinRoom from './ModalConfirmJoinRoom';

function AuctionPage() {
  const [show, setShow] = useState(false);
  const [AuctionData, setActionData] = useState({});

  const handleJoin = (aution) => {
    console.log("Delete item with id:", aution.id);
    setActionData(aution);
    setShow(true);
  };
  const auctionRooms = [
    {
      id: 1,
      title: "Phòng 1",
      description: "Mô tả phòng 1",
      currentParticipants: 5,
      productCode: "SP001",
      duration: "30 phút",
      startTime: "10:00 25/02/2024",
      endTime: "10:30 25/02/2024",
      images: [
        "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg", 
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8w6TKU8zvTgVk38Cdw2pMddLsJGvlEi5ZQ&usqp=CAU", 
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hb_Fnt1hatRzXyvhGMBnf0VNWeB1QwPPMQ&usqp=CAU",
    ]
    },
    {
        id: 2,
        title: "Phòng 2",
        description: "Mô tả phòng 1",
        currentParticipants: 5,
        productCode: "SP002",
        duration: "30 phút",
        startTime: "10:00 25/02/2024",
        endTime: "10:30 25/02/2024",
        images: [
          "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8w6TKU8zvTgVk38Cdw2pMddLsJGvlEi5ZQ&usqp=CAU", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hb_Fnt1hatRzXyvhGMBnf0VNWeB1QwPPMQ&usqp=CAU",
      ]
      },
      {
        id: 3,
        title: "Phòng 3",
        description: "Mô tả phòng 1",
        currentParticipants: 5,
        productCode: "SP003",
        duration: "30 phút",
        startTime: "10:00 25/02/2024",
        endTime: "10:30 25/02/2024",
        images: [
          "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8w6TKU8zvTgVk38Cdw2pMddLsJGvlEi5ZQ&usqp=CAU", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hb_Fnt1hatRzXyvhGMBnf0VNWeB1QwPPMQ&usqp=CAU",
      ]
      },
      {
        id: 4,
        title: "Phòng 4",
        description: "Mô tả phòng 1",
        currentParticipants: 5,
        productCode: "SP004",
        duration: "30 phút",
        startTime: "10:00 25/02/2024",
        endTime: "10:30 25/02/2024",
        images: [
          "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE8w6TKU8zvTgVk38Cdw2pMddLsJGvlEi5ZQ&usqp=CAU", 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6hb_Fnt1hatRzXyvhGMBnf0VNWeB1QwPPMQ&usqp=CAU",
      ]
      },  
    {
      id: 5,
      title: "Phòng 5",
      description: "Mô tả phòng 2",
      currentParticipants: 3,
      productCode: "SP005",
      duration: "45 phút",
      startTime: "11:00 25/02/2024",
      endTime: "11:45 25/02/2024",
      images: ["/path/to/image4.jpg", "/path/to/image5.jpg", "/path/to/image6.jpg"]
    },
    // Thêm các phòng khác với thông tin tương tự
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="app-container">
<div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <div className="container" style={{ marginBottom: "20px" }}></div>

      <Container className="my-4">
        <h1>Room Auction</h1>
        <Row className="mb-4">
          <Col md={5}>
            <InputGroup>
              <FormControl
                placeholder="Nhập mã sản phẩm..."
                aria-label="Nhập mã sản phẩm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant="outline-secondary">Tìm kiếm</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          {auctionRooms
            .filter(room => room.productCode.includes(searchTerm))
            .map((room) => (
              <Col key={room.id} sm={12} md={4} className="mb-4">
                <Card>
                  <Carousel>
                    {room.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <Card.Body>
                    <Card.Title>{room.title}</Card.Title>
                    <Card.Text>{room.description}</Card.Text>
                    <Card.Text>Mã sản phẩm: {room.productCode}</Card.Text>
                    <Card.Text>Số người tham gia: {room.currentParticipants}</Card.Text>
                    <Card.Text>Thời gian: {room.startTime} - {room.endTime} ({room.duration})</Card.Text>
                    <Button variant="primary" onClick={()=>handleJoin(room)}>Tham gia</Button>
                    {/* <Button variant="primary">Tham gia</Button> */}
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
      </Container>
      </div>
        <div className="footer-container">
          <Footer />
        </div>
        <ModalConfirmJoinRoom
        showProp={show}
        handleClose={() => {
          setShow(false);
        }}
        auctionData={AuctionData}
      />
      </div>
  );
}

export default AuctionPage;
