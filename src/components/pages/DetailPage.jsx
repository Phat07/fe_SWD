import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { FaGavel } from "react-icons/fa";
import "../../css/detail.css";
import { Button, Card, Carousel, Col } from "react-bootstrap";

function DetailPage(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State để kiểm soát hiển thị popup
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
      }
  ];
  const images = [
    "../../../public/assets/images/background/background1.jpg",
    "../../../public/assets/images/background/background2.jpg",
    "../../../public/assets/images/background/background3.jpg",
    "../../../public/assets/images/background/background4.jpg",
    "../../../public/assets/images/background/background5.jpg",
  ];
  const [activeDiv, setActiveDiv] = useState(1); // State để theo dõi div đang active

  // Hàm xử lý khi click vào một div
  const handleDivClick = (divIndex) => {
    setActiveDiv(divIndex); // Set active div bằng index của div được click
  };
  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowPopup(true); // Khi click vào hình ảnh, hiển thị popup
  };

  const handleClosePopup = (index) => {
    setSelectedImage(index);
    setShowPopup(false); // Đóng popup khi nhấn nút đóng
  };
  console.log("index", selectedImage);
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(../../../public/assets/images/background/background5.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div
          style={{
            paddingTop: "32px",
            paddingBottom: "26px",
            borderBottom: "1px solid #E0E0E0",
            backgroundImage:
              "url('../../../public/assets/images/background/auction.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <h2 className="current-page">Danh sách cuộc đấu giá</h2>
          <div className="link-redirect" style={{ marginTop: "20px" }}>
            <Link
              className="page-index"
              style={{
                color: "#787878",
                textDecoration: "none",
                cursor: "pointer",
              }}
              to="/"
            >
              Trang chủ
            </Link>
            /
            <span
              className="page-des"
              style={{
                fontWeight: "bold",
                color: "#787878",
                marginLeft: "5px",
              }}
            >
              Tài sản cuộc đấu giá
            </span>
          </div>
        </div>
        <div className="container">
          <div className="row high-padding">
            <div className="col-lg-5 col-md-4 sidebar-content">
              <div className="gallery-container">
                <div className="main-image">
                  {selectedImage !== null && (
                    <img
                      src={images[selectedImage]}
                      alt="Selected"
                      onClick={handleClosePopup}
                    />
                  )}
                  {selectedImage === null && <img src={images[0]} alt="Main" />}
                </div>
                <div className="thumbnail-container">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className={
                        selectedImage === index ? "selected-thumbnail" : ""
                      }
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-8">
              <p className="para">Thời gian đếm ngược bắt đầu trả giá</p>
              <div className="timestamp-div">
                09 NGÀY 18 GIỜ 38 PHÚT 00 GIÂY
              </div>
              <div className="register-form">
                <div className="row">
                  <div className="col-6 left-infor-text">a</div>
                  <div className="col-6 right-info-text">b</div>
                  <div className="col-6 left-infor-text">a</div>
                  <div className="col-6 right-info-text">b</div>
                  <div className="col-6 left-infor-text">a</div>
                  <div className="col-6 right-info-text">b</div>
                  <div className="col-6 left-infor-text">a</div>
                  <div className="col-6 right-info-text">b</div>
                  <div className="col-6 left-infor-text">a</div>
                  <div className="col-6 right-info-text">b</div>
                  <div className="col-6 left-infor-text">a</div>
                  <div className="col-6 right-info-text">b</div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "#B41712",
                    borderRadius: "15px",
                    margin: "15px",
                  }}
                >
                  <FaGavel />
                  <Link to={"/payment"}>
                    <Button
                      style={{ backgroundColor: "#B41712", border: "none" }}
                    >
                      Đăng ký tham gia đấu giá
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row d-flex justify-content-center g-4"
          style={{ marginTop: "20px" }}
        >
          <div className="col-lg-12 row ul">
            {/* Render các div và xác định trạng thái active bằng className */}
            <div
              className={`col-lg-4 ${activeDiv === 1 ? "active" : ""}`}
              onClick={() => handleDivClick(1)}
            >
              Mô tả tài sản
            </div>
            <div
              className={`col-lg-4 ${activeDiv === 2 ? "active" : ""}`}
              onClick={() => handleDivClick(2)}
            >
              Thông tin đấu giá
            </div>
            <div
              className={`col-lg-4 ${activeDiv === 3 ? "active" : ""}`}
              onClick={() => handleDivClick(3)}
            >
              Tài sản liên quan
            </div>
          </div>
          <div className="col-lg-12 info-ap">
            {activeDiv === 1 ? <>thông tin mô tả tài sản</> : <></>}
            {activeDiv === 2 ? <>thông tin mô tả đấu giá</> : <></>}
            {activeDiv === 3 ? <>thông tin mô tả liên quan</> : <></>}
          </div>
        </div>
        <div className="col-lg-12" style={{ marginTop: "20px" }}>
          <h3 style={{marginBottom:"25px",fontWeight:"800"}}>Tài sản khác</h3>
          <div className="row d-flex g-4">
              {auctionRooms
                .map((room) => (
                  <Col key={room.id} sm={12} md={3} className="mb-4">
                    <Card>
                      <Carousel>
                        {room.images.map((image, index) => (
                          <Carousel.Item key={index}>
                            <img
                              className="d-block w-100"
                              src={image}
                              alt={`Slide ${index + 1}`}
                              style={{
                                height: "200px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                      <Card.Body>
                        <Card.Title>{room.title}</Card.Title>
                        <Card.Text>{room.description}</Card.Text>
                        <Card.Text>Mã sản phẩm: {room.productCode}</Card.Text>
                        <Card.Text>
                          Số người tham gia: {room.currentParticipants}
                        </Card.Text>
                        <Card.Text>
                          Thời gian: {room.startTime} - {room.endTime} (
                          {room.duration})
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => handleJoin(room)}
                        >
                          Tham gia
                        </Button>
                        {/* <Button variant="primary">Tham gia</Button> */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
          </div>
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <button
              className="close-button"
              onClick={() => handleClosePopup(selectedImage)}
            >
              X
            </button>
            <img src={images[selectedImage]} alt="Popup" />
          </div>
        </div>
      )}
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default DetailPage;
