import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";

import { format } from "date-fns";
import {
  Button,
  Card,
  Carousel,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSpring } from "react-spring";
import io from "socket.io-client";
import "../../../css/animateIcon.css";
import {
  actAuctionBidPost,
  actGetMemberJoinAuctionGetAsync,
  actGetMostPriceAuctionGetAsync,
} from "../../../store/auction/action";
import Footer from "../../Footer";
import Header from "../../Header";

const socket = io("http://localhost:3001");
function JoinAuctionRoom() {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });
  // Giả sử đây là thời gian kết thúc đấu giá tính bằng milliseconds
  // const endTime = new Date().getTime() + 10000000; // 10.000 giây từ bây giờ
  const [data, setData] = useState("");
  const [newBid, setNewBid] = useState("");
  const [auctionBid, setAuctionBid] = useState("");
  const [statusSubmit, setStatusSubmit] = useState(true);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const { auctionID } = useParams();
  const dispatch = useDispatch();
  console.log("id", auctionID);
  const token = localStorage.getItem("ACCESS_TOKEN");

  const user = useSelector((state) => state.USER.currentUser);
  const mostPrice = useSelector((state) => state.AUCTION.mostPrice);
  console.log("mostPrice", mostPrice);
  const auctions = useSelector((state) => state.AUCTION.auctions);
  const memberPriceAuction = useSelector(
    (state) => state.AUCTION.memberPriceAuction
  );

  console.log("memberJoin", auctions);
  console.log("aucctionsssBid", auctionBid);
  console.log("memberPriceAuction", memberPriceAuction);

  useEffect(() => {
    const item = auctions.find((i) => i._id === auctionID);
    setAuctionBid(item);
  }, [auctions, auctionID]);
  const handleBidChange = (e) => {
    setNewBid(e);
  };
  useEffect(() => {
    // Lấy thời gian kết thúc đấu giá từ state hoặc từ dữ liệu đã có
    const endTime = new Date(auctionBid?.end_time).getTime();
    let data = {
      winner_id: mostPrice?.customer_id,
      auction_id: auctionID,
      host_id: user?._id,
      price: mostPrice?.price,
    };
    // Tạo một interval để kiểm tra thời gian hiện tại so với endTime
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (currentTime >= endTime) {
        // Nếu thời gian hiện tại vượt qua thời gian kết thúc, gửi sự kiện thông báo đấu giá kết thúc
        setStatusSubmit(false);
        setShowWinnerModal(true); // Hiển thị modal khi thời gian kết thúc
        // setWinnerInfo(data);
        socket.emit("auctionEnded", data);
        // Xóa interval để ngăn việc kiểm tra tiếp
        clearInterval(interval);
      }
    }, 1000); // Kiểm tra mỗi giây

    // Đảm bảo dừng interval khi component unmount
    return () => clearInterval(interval);
  }, [auctionBid?.end_time, auctionID]);

  useEffect(() => {
    let data = {
      auctionId: auctionID,
    };
    // Lắng nghe sự kiện 'newBid' từ server
    socket.on("bidAccepted", (newBidData) => {
      setData(newBidData); // Cập nhật dữ liệu đấu giá mới
      dispatch(actGetMostPriceAuctionGetAsync(data, token));
      dispatch(actGetMemberJoinAuctionGetAsync(data, token));
    });
    dispatch(actGetMostPriceAuctionGetAsync(data, token));
    dispatch(actGetMemberJoinAuctionGetAsync(data, token));
    // Đừng quên hủy lắng nghe khi component unmount
    return () => {
      socket.off("bidAccepted");
    };
  }, []);
  console.log("newBid", newBid);
  console.log("dataBID", data);
  const submitBid = () => {
    let data = {
      auctionId: auctionBid?._id,
      customerId: user?._id,
      price: +newBid,
    };
    // Gửi yêu cầu đấu giá lên server
    dispatch(actAuctionBidPost(data, token));
    setNewBid("");
    socket.emit("submitBid");
  };

  function formatCurrencyVND(amount) {
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
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
                {auctionBid?.product_id?.image?.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Slide ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        height: "400px",
                        width: "100%",
                      }}
                    />
                  </Carousel.Item>
                ))}
                {auctionBid?.product_id?.video?.map((video, index) => (
                  <Carousel.Item key={`video-${index}`}>
                    <video
                      controls
                      style={{
                        maxHeight: "400px", // Điều chỉnh kích thước tối đa cho video, giữ nguyên tỉ lệ
                        width: "100%", // Lấp đầy toàn bộ chiều rộng của vùng hiển thị
                        objectFit: "cover", // Giữ cho video không bị méo khi được co giãn
                      }}
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body>
                <Card>
                  <Card.Body>
                    <Card.Title>Thông Tin Sản Phẩm</Card.Title>
                    <div className="mb-3">
                      <strong>
                        Tên sản phẩm: {auctionBid?.product_id?.name}
                      </strong>
                    </div>
                    <div className="mb-3">
                      <strong>
                        Mô tả: {auctionBid?.product_id?.description}
                      </strong>
                    </div>
                    <div className="mb-3">
                      <strong>
                        Giá khởi điểm:{" "}
                        {formatCurrencyVND(auctionBid?.starting_price)}
                      </strong>{" "}
                    </div>
                    <div className="mb-3">
                      <strong>
                        Bước giá: {formatCurrencyVND(auctionBid?.price_step)}
                      </strong>{" "}
                    </div>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Thời gian còn lại đến khi kết thúc đấu Giá
                </Card.Title>
                <Card.Title style={{ textAlign: "center" }}>
                  <strong>
                    <Countdown
                      date={new Date(auctionBid?.end_time)}
                      renderer={({
                        days,
                        hours,
                        minutes,
                        seconds,
                        completed,
                      }) => {
                        if (completed) {
                          return "Expired";
                        } else {
                          return (
                            <>
                              {days} days {hours} hours {minutes} minutes{" "}
                              {seconds} seconds{" "}
                              {/* <FaAngleDoubleRight style={{ color: "blue" }} />{" "}
                              kết thúc đấu giá */}
                            </>
                          );
                        }
                      }}
                    />
                  </strong>
                </Card.Title>
                {/* <animated.div style={styles}>
                  <FaUser size={40} />
                </animated.div> */}

                <Card className="mt-3 mb-3">
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      {statusSubmit === true
                        ? "Số tiền hiện tại:"
                        : "Số tiền thắng đấu giá:"}
                    </Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <strong>{formatCurrencyVND(mostPrice?.price)}</strong>
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Money Add</th>
                            <th>Bid Time Auction</th>
                          </tr>
                        </thead>
                        <tbody>
                          {memberPriceAuction?.map((item, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  color: `${
                                    item?.customer_id === user?._id
                                      ? "green"
                                      : ""
                                  }`,
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  color: `${
                                    item?.customer_id === user?._id
                                      ? "green"
                                      : ""
                                  }`,
                                }}
                              >
                                {item?.customer_id === user?._id ? (
                                  // <div className="animated-user-icon">
                                  //   <FaUser className="user-icon" size={20} />
                                  // </div>
                                  <>YOU</>
                                ) : (
                                  // <>đây là bạn</>
                                  <>
                                    <span style={{ fontWeight: "600" }}>
                                      xxxx
                                    </span>
                                    {item?.customer_id?.slice(-4)}
                                  </>
                                )}
                              </td>
                              <td
                                style={{
                                  color: `${
                                    item?.customer_id === user?._id
                                      ? "green"
                                      : ""
                                  }`,
                                }}
                              >
                                {formatCurrencyVND(item?.price)}
                              </td>
                              <td
                                style={{
                                  color: `${
                                    item?.customer_id === user?._id
                                      ? "green"
                                      : ""
                                  }`,
                                }}
                              >
                                {formatDate(item?.create_time)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>

                {user?.role_id?.title === "MEMBER" ? (
                  // Render this block if user's role is "MEMBER"
                  <>
                    {statusSubmit === true ? (
                      <Form>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextBid"
                        >
                          <Col sm="8">
                            <Form.Control
                              as={CurrencyFormat}
                              thousandSeparator={true}
                              decimalSeparator="."
                              allowNegative={false}
                              placeholder="Nhập số tiền đấu giá"
                              value={newBid}
                              onValueChange={(values) => {
                                const { value } = values;
                                handleBidChange(value);
                              }}
                              suffix=" đ"
                            />
                          </Col>

                          <Col sm="4">
                            <Button variant="primary" onClick={submitBid}>
                              Đấu Giá
                            </Button>
                          </Col>
                        </Form.Group>
                      </Form>
                    ) : (
                      <h6>Buổi đấu giá đã kết thúc</h6>
                    )}
                  </>
                ) : (
                  // Render nothing if user's role is not "MEMBER"
                  <></>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal show={showWinnerModal} onHide={() => setShowWinnerModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Người Chiến Thắng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {user?._id === mostPrice?.customer_id ? (
                <>Chúc mừng bạn là người chiến thắng</>
              ) : (
                <>Người chiến thắng: {mostPrice?.customer_id?.slice(-4)}</>
              )}
            </p>
            <p>
              Giá thầu cao nhất: {" "}
              <CurrencyFormat
                value={mostPrice?.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
              />
              đ
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowWinnerModal(false)}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default JoinAuctionRoom;
