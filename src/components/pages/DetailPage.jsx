import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGavel, FaLock } from "react-icons/fa";
import { useTimer } from "react-timer-hook";
import { format } from "date-fns";
import Countdown from "react-countdown";
import "../../css/detail.css";
import { Image, Modal } from "react-bootstrap";
import { Button, Card, Carousel, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  actAuctionGetAsync,
  actGetAllMemberJoinAuctionRoomGetAsync,
  actGetMostPriceAuctionGetAsync,
} from "../../store/auction/action";
import { actMoneyCofigGetAsync } from "../../store/moneyConfig/action";
import { actJoinRegisterAuctionForMemberAsync } from "../../store/wallet/action";
import { toast } from "react-toastify";

function DetailPage(props) {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State để kiểm soát hiển thị popup

  const [activeDiv, setActiveDiv] = useState(1); // State để theo dõi div đang active
  const { id } = useParams(); // Lấy ID từ URL
  const dispatch = useDispatch();
  const [auction, setAuction] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const auctions = useSelector((state) => state.AUCTION.auctions);
  const user = useSelector((state) => state.USER.currentUser);
  console.log("aucctionsss", auctions);
  const conFigMoney = useSelector((state) => state.MONEYCONFIG.configMoney);
  console.log("configMoney", conFigMoney);
  const joinAuctionConfig = conFigMoney?.find(
    (config) => config.type_config === "Join in auction"
  );
  const mostPriceDetail = useSelector((state) => state.AUCTION.mostPrice);
  console.log("mostPriceDetail", mostPriceDetail);

  const allMemberJoinInAuction = useSelector(
    (state) => state.AUCTION.allMemberJoinInAuction
  );
  console.log("allMemberJoinInAuction", allMemberJoinInAuction);
  const filterNumberMemberJoinRoom = allMemberJoinInAuction?.filter(
    (e) => e?.member_id?.role_id?.title !== "HOST"
  );
  console.log("number", filterNumberMemberJoinRoom);
  const token = localStorage.getItem("ACCESS_TOKEN");
  useEffect(() => {
    dispatch(actAuctionGetAsync(token));
  }, [id, dispatch, token]);
  useEffect(() => {
    let data = {
      auctionId: id,
    };
    dispatch(actMoneyCofigGetAsync(token));
    dispatch(actGetMostPriceAuctionGetAsync(data, token));
    dispatch(actGetAllMemberJoinAuctionRoomGetAsync(data, token));
  }, []);
  useEffect(() => {
    const item = auctions.find((i) => i._id === id);
    setAuction(item);
  }, [auctions, id]);
  console.log("detailAuction", auction);
  const auctionStartTime = new Date(auction?.regitration_end_time).getTime();
  const currentTime = new Date().getTime();
  const timeDiff = auctionStartTime - currentTime;

  const endTimeToRender = new Date(auction?.end_time).getTime();
  const renderResult = endTimeToRender - currentTime;
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
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
  console.log("test",formatDate('2024-03-16T18:10:00.000+00:00'));

  const handleJoinConfirmation = () => {
    let data = {
      userId: user?._id,
      auctionId: id,
    };
    // Xác nhận tham gia đấu giá
    // Thực hiện các hành động khi người dùng xác nhận tham gia đấu giá ở đây
    setShowConfirmationModal(false); // Đóng modal sau khi xác nhận
    dispatch(actJoinRegisterAuctionForMemberAsync(data, token));
  };

  const handleJoin = (room) => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để tham gia đấu giá");
    }
    // Mở modal xác nhận khi người dùng nhấn tham gia
    setShowConfirmationModal(true);
  };
  function formatCurrencyVND(amount) {
    // Sử dụng hàm toLocaleString() để định dạng số
    // Cài đặt style là 'currency' và currency là 'VND'
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
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
          <h2 className="current-page">Danh sách sản phẩm đấu giá</h2>
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
              <div className="row high-padding">
                <div className="col-lg-12 col-md-12 sidebar-content">
                  {/* Hiển thị hình ảnh */}
                  <Card>
                    <Card.Body>
                      <Card.Title>Ảnh Video Sản Phẩm</Card.Title>
                      {/* <Carousel>
                        {auction?.product_id?.image?.map((image, index) => (
                          <Carousel.Item key={index}>
                            <Image
                              className="d-block w-100"
                              src={image}
                              alt={`Slide ${index + 1}`}
                              fluid
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel> */}
                      <Carousel>
                        {auction?.product_id?.image?.map((image, index) => (
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
                        {auction?.product_id?.video?.map((video, index) => (
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
                    </Card.Body>
                  </Card>
                </div>
                {/* <div className="col-lg-6 col-md-6">
                  <Card>
                    <Card.Body>
                      <Card.Title>Video Sản Phẩm</Card.Title>
                      <div style={{ position: "relative", marginTop: "20px" }}>
                        <video controls style={{ maxWidth: "100%" }}>
                          {auction?.product_id?.video?.map((video, index) => (
                            <source key={index} src={video} type="video/mp4" />
                          ))}
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </Card.Body>
                  </Card>
                </div> */}
              </div>
            </div>
            <div className="col-lg-7 col-md-8">
              <p className="para">Thời gian đếm ngược đăng ký bắt đầu</p>
              <div className="timestamp-div">
                <div className="countdown-container">
                  {timeDiff > 0 ? (
                    <div className="countdown-container">
                      <Countdown
                        date={Date.now() + timeDiff}
                        renderer={({ days, hours, minutes, seconds }) => (
                          <div>
                            <span>{days} days</span> -{" "}
                            <span>{hours} hours</span> -{" "}
                            <span>{minutes} minutes</span> -{" "}
                            <span>{seconds} seconds</span>
                          </div>
                        )}
                      />
                    </div>
                  ) : (
                    <h5>0 days - 0 hours - 0 minutes - 0 seconds</h5>
                  )}
                </div>
              </div>
              <div className="register-form">
                <div className="row">
                  <div className="col-6 left-infor-text">
                    Regitration_start_time
                  </div>
                  <div className="col-6 right-info-text">
                    {formatDate(auction?.regitration_start_time)}
                  </div>
                  <div className="col-6 left-infor-text">
                    Regitration_end_time
                  </div>
                  <div className="col-6 right-info-text">
                    {formatDate(auction?.regitration_end_time)}
                  </div>
                  <div className="col-6 left-infor-text">Start_time</div>
                  <div className="col-6 right-info-text">
                    {formatDate(auction?.start_time)}
                  </div>
                  <div className="col-6 left-infor-text">End_time</div>
                  <div className="col-6 right-info-text">
                    {formatDate(auction?.end_time)}
                  </div>
                  <div className="col-6 left-infor-text">Price</div>
                  <div className="col-6 right-info-text">
                    {formatCurrencyVND(auction?.starting_price)}
                  </div>
                  <div className="col-6 left-infor-text">Price Step</div>
                  <div className="col-6 right-info-text">
                    {formatCurrencyVND(auction?.price_step)}
                  </div>
                  {/*  */}
                  {renderResult <= 0 ? (
                    <>
                      <div className="col-6 left-infor-text">Winner </div>
                      <div className="col-6 right-info-text">
                        {mostPriceDetail?.customer_id?.slice(-4)}
                      </div>
                      <div className="col-6 left-infor-text">Win Price</div>
                      <div className="col-6 right-info-text">
                        {formatCurrencyVND(mostPriceDetail?.price)}
                      </div>
                      <div className="col-6 left-infor-text">
                        Number people register in room auction
                      </div>
                      <div className="col-6 right-info-text">
                        {filterNumberMemberJoinRoom.length}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-6 left-infor-text">Winner </div>
                      <div className="col-6 right-info-text">
                        Waiting {formatDate(auction?.end_time)}
                      </div>
                      <div className="col-6 left-infor-text">Win Price</div>
                      <div className="col-6 right-info-text">
                        Waiting {formatDate(auction?.end_time)}
                      </div>
                      <div className="col-6 left-infor-text">
                        Number people register in room auction
                      </div>
                      <div className="col-6 right-info-text">
                        {filterNumberMemberJoinRoom.length}
                      </div>
                    </>
                  )}
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
                  {timeDiff > 0 ? (
                    <>
                      <FaGavel />
                      <Button
                        style={{ backgroundColor: "#B41712", border: "none" }}
                        onClick={handleJoin}
                      >
                        Đăng ký tham gia đấu giá
                      </Button>
                    </>
                  ) : (
                    <>
                      <FaLock />
                      <h5>Thời gian tham gia đấu giá đã hết</h5>
                    </>
                  )}
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
            {activeDiv === 1 ? <>{auction?.product_id?.description}</> : <></>}
            {activeDiv === 2 ? <>{auction?.auctionInfo}</> : <></>}
            {activeDiv === 3 ? <>thông tin mô tả liên quan</> : <></>}
          </div>
        </div>
        <div className="col-lg-12" style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "25px", fontWeight: "800" }}>
            Tài sản khác
          </h3>
          <div className="row d-flex g-4">
            {/* {auctionRooms.map((room) => (
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
                    <Button variant="primary" onClick={() => handleJoin(room)}>
                      Tham gia
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))} */}
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        {user && (
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận tham gia đấu giá</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          <p>
            {user ? (
              <>
                Bạn có muốn tham gia đấu giá với mức phí là{" "}
                {formatCurrencyVND(joinAuctionConfig?.money)}?
              </>
            ) : (
              <div>
                <Modal.Body>Bạn cần đăng nhập để đấu giá</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => navigate("/login")}>
                    Go to Login
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </p>
        </Modal.Body>
        {user && (
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmationModal(false)}
            >
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handleJoinConfirmation}>
              Xác nhận
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default DetailPage;
