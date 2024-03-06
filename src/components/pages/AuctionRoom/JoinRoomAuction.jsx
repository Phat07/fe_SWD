import React, { useState, useEffect } from "react";
import { Card, Button, Carousel, Form, Row, Col, Table } from "react-bootstrap";
import Header from "../../Header";
import Footer from "../../Footer";

function JoinAuctionRoom() {
  // Giả sử đây là thời gian kết thúc đấu giá tính bằng milliseconds
  // const endTime = new Date().getTime() + 10000000; // 10.000 giây từ bây giờ
  const [currentBid, setCurrentBid] = useState(0);
  const [newBid, setNewBid] = useState("");
  // const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const now = new Date().getTime();
  //     const distance = endTime - now;
  //     setTimeLeft(distance);

  //     if (distance < 0) {
  //       clearInterval(timer);
  //       setTimeLeft(0);
  //       // Thêm logic ở đây khi đấu giá kết thúc
  //     }
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [endTime]);

  const handleBidChange = (e) => {
    setNewBid(e.target.value);
  };

  const submitBid = () => {
    if (parseInt(newBid) > currentBid) {
      setCurrentBid(parseInt(newBid));
      setNewBid("");
      // Thêm logic cập nhật lên server ở đây
    } else {
      alert("Your bid must be higher than the current bid.");
    }
  };

  // Định dạng thời gian đếm ngược
  // const formatTimeLeft = () => {
  //   let seconds = Math.floor((timeLeft / 1000) % 60);
  //   let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  //   let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

  //   hours = hours < 10 ? "0" + hours : hours;
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   seconds = seconds < 10 ? "0" + seconds : seconds;

  //   return hours + ":" + minutes + ":" + seconds;
  // };
  const data = [
    {
      name: "Aution 3",
      status: "active",
      moneyAdd: "500000",
      Total: "1000000",
    },
    {
      name: "Aution 4",
      status: "active",
      moneyAdd: "500000",
      Total: "2000000",
    },
    // Thêm dữ liệu mẫu khác tại đây
  ];
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}></div>
        <Row>
          <Col>
            <Card>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="data:image/jpeg;base64,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" // Thay thế đường dẫn hình ảnh của bạn ở đây
                    alt="First slide"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <video
                    controls
                    className="d-block w-100"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  >
                    <source src="/path/to/video.mp4" type="video/mp4" />{" "}
                    {/* Thay thế đường dẫn video của bạn ở đây */}
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <Card>
                  <Card.Body>
                    <Card.Title>Thông Tin Sản Phẩm</Card.Title>
                    <div className="mb-3">
                      <strong>Tên sản phẩm:</strong>
                    </div>
                    <div className="mb-3">
                      <strong>Mô tả:</strong>
                    </div>
                    <div className="mb-3">
                      <strong>Giá khởi điểm:</strong>{" "}
                      {/* {startingPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })} */}
                    </div>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Đấu Giá</Card.Title>
                <Card.Title style={{ textAlign: "center" }}>
                  <strong>Thời gian còn lại: 32:36:42</strong>
                </Card.Title>

                <Card className="mt-3 mb-3">
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      Số tiền hiện tại:
                    </Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <strong>${currentBid}</strong>
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Money Add</th>
                          {/* <th>Money Total</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>+{item.moneyAdd}</td>
                            {/* <td>{item.Total}</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>

                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextBid"
                  >
                    <Col sm="8">
                      <Form.Control
                        type="number"
                        placeholder="Nhập số tiền đấu giá"
                        value={newBid}
                        onChange={handleBidChange}
                      />
                    </Col>
                    <Col sm="4">
                      <Button variant="primary" onClick={submitBid}>
                        Đấu Giá
                      </Button>
                    </Col>
                  </Form.Group>
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
}

export default JoinAuctionRoom;
