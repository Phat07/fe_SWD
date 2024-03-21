import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Form, Carousel, Modal } from "react-bootstrap";
import Header from "../../Header";
import Footer from "../../Footer";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import {
  actAuctionGetAsync,
  actGetAllMemberJoinAuctionRoomGetAsync,
  actAuctionPutAsync,
} from "../../../store/auction/action";
import { format } from "date-fns";
import { toast } from "react-toastify";

const AuctionDetail = () => {
  const { auctionId } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const auctions = useSelector((state) => state.AUCTION.auctions);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const [auction, setAuction] = useState("");
  const [auctionInfo, setAuctionInfo] = useState("");
  const [stepPrice, setStepPrice] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [regitrationStartTime, setRegitrationStartTime] = useState("");
  const [regitrationEndTime, setRegitrationEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalNotStatus, setShowModalNotStatus] = useState(false);
  const user = useSelector((state) => state.USER.currentUser);

  useEffect(() => {
    dispatch(actAuctionGetAsync(token));
  }, [auctionId]);
  useEffect(() => {
    const item = auctions.find((i) => i._id === auctionId);
    setAuction(item);
    setAuctionInfo(item?.auctionInfo);
    setStepPrice(item?.price_step);
    setStartingPrice(item?.starting_price);
    setRegitrationStartTime(item?.regitration_start_time);
    setRegitrationEndTime(item?.regitration_end_time);
    setStartTime(item?.start_time);
    setEndTime(item?.end_time);
  }, [auctions, auctionId]);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
  const allMemberJoinInAuction = useSelector(
    (state) => state.AUCTION.allMemberJoinInAuction
  );
  const filterNumberMemberJoinRoom = allMemberJoinInAuction?.filter(
    (e) => e?.member_id?.role_id?.title !== "HOST"
  );
  useEffect(() => {
    let data = {
      auctionId: auctionId,
    };
    dispatch(actGetAllMemberJoinAuctionRoomGetAsync(data, token));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!regitrationEndTime || !startTime || !endTime) {
      toast.error("Vui lòng điền tất cả các trường trong form!");
      return;
    }

    // Chuyển đổi chuỗi thời gian thành đối tượng Date để so sánh
    const startAuction = new Date(auction?.start_time);
    const regEnd = new Date(regitrationEndTime);
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    // Kiểm tra các điều kiện thời gian
    if (startAuction < now) {
      // toast.error(
      //   "Thời gian bắt đầu đăng kí cho buổi đấu giá đã diễn ra! Cập nhật thất bại"
      // );
      setShowModal(true);
      return;
    }
    if (regEnd < now) {
      toast.error("Thời gian kết thúc đăng ký không được trong quá khứ!");
      return;
    }

    if (start < now) {
      toast.error("Thời gian bắt đầu đấu giá không được trong quá khứ!");
      return;
    }

    if (end < now) {
      toast.error("Thời gian kết thúc đấu giá không được trong quá khứ!");
      return;
    }
    // Kiểm tra các điều kiện thời gian

    if (regEnd >= start) {
      toast.error(
        "Thời gian kết thúc đăng ký phải trước thời gian bắt đầu đấu giá!"
      );
      return;
    }

    if (start >= end) {
      toast.error(
        "Thời gian bắt đầu đấu giá phải trước thời gian kết thúc đấu giá!"
      );
      return;
    }

    let data = {
      // Khai báo và sử dụng data như trước
      start_time: startTime,
      end_time: endTime,
      regitration_end_time: regitrationEndTime,
      status: "not yet auctioned",
      host_id: user?._id,
    };
    setIsSubmitting(true);
    // Gửi dữ liệu đi như bình thường sau khi tất cả các điều kiện kiểm tra đã được thông qua
    dispatch(actAuctionPutAsync(auctionId, data, token)).then(() => {
      setIsSubmitting(false);
      setRegitrationEndTime("");
      setStartTime("");
      setEndTime("");
      toast.success("Cập nhật thành công");
      navigate("/manage-auction");
    });
  };

  const handleSubmitNotStatus = (e) => {
    e.preventDefault();
    if (
      !auctionInfo ||
      !stepPrice ||
      !startingPrice ||
      !regitrationStartTime ||
      !regitrationEndTime ||
      !startTime ||
      !endTime
    ) {
      toast.error("Vui lòng điền tất cả các trường trong form!");
      return;
    }

    // Chuyển đổi chuỗi thời gian thành đối tượng Date để so sánh
    const regStartAuction = new Date(auction?.regitration_start_time);
    const regStart = new Date(regitrationStartTime);
    const regEnd = new Date(regitrationEndTime);
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    // Kiểm tra các điều kiện thời gian
    if (regStartAuction < now) {
      // toast.error(
      //   "Thời gian bắt đầu đăng kí cho buổi đấu giá đã diễn ra! Cập nhật thất bại"
      // );
      setShowModalNotStatus(true);
      return;
    }

    if (regStart < now) {
      toast.error("Thời gian bắt đầu đăng ký không được trong quá khứ!");
      return;
    }
    if (regEnd < now) {
      toast.error("Thời gian kết thúc đăng ký không được trong quá khứ!");
      return;
    }

    if (start < now) {
      toast.error("Thời gian bắt đầu đấu giá không được trong quá khứ!");
      return;
    }

    if (end < now) {
      toast.error("Thời gian kết thúc đấu giá không được trong quá khứ!");
      return;
    }
    // Kiểm tra các điều kiện thời gian
    if (regStart >= regEnd) {
      toast.error(
        "Thời gian bắt đầu đăng ký phải trước thời gian kết thúc đăng ký!"
      );
      return;
    }
    if (regEnd >= start) {
      toast.error(
        "Thời gian kết thúc đăng ký phải trước thời gian bắt đầu đấu giá!"
      );
      return;
    }

    if (start >= end) {
      toast.error(
        "Thời gian bắt đầu đấu giá phải trước thời gian kết thúc đấu giá!"
      );
      return;
    }

    let data = {
      // Khai báo và sử dụng data như trước
      starting_price: startingPrice,
      price_step: stepPrice,
      auctionInfo: auctionInfo,
      start_time: startTime,
      end_time: endTime,
      regitration_end_time: regitrationEndTime,
      regitration_start_time: regitrationStartTime,
      status: "not",
      host_id: user?._id,
    };
    setIsSubmitting(true);
    // Gửi dữ liệu đi như bình thường sau khi tất cả các điều kiện kiểm tra đã được thông qua
    dispatch(actAuctionPutAsync(auctionId, data, token)).then(() => {
      setIsSubmitting(false);
      setRegitrationEndTime("");
      setStartTime("");
      setEndTime("");
      toast.success("Cập nhật thành công");
      navigate("/manage-auction");
    });
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
                <strong>Thông Tin Chi Tiết Autionn với ID {auctionId} </strong>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Ảnh Sản Phẩm</Card.Title>
                          <Carousel>
                            {auction?.product_id?.image?.map((image, index) => (
                              <Carousel.Item key={index}>
                                <img
                                  className="d-block w-100"
                                  src={image}
                                  alt={`Slide ${index + 1}`}
                                  style={{
                                    objectFit: "cover", // Đảm bảo ảnh không bị méo và lấp đầy hoàn toàn vùng hiển thị
                                    height: "400px", // Điều chỉnh kích thước cao tối đa
                                    width: "100%", // Lấp đầy toàn bộ chiều rộng của vùng hiển thị
                                  }}
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Video Sản Phẩm</Card.Title>
                          <div
                            style={{ position: "relative", marginTop: "20px" }}
                          >
                            <video controls style={{ maxWidth: "100%" }}>
                              {auction?.product_id?.video?.map(
                                (video, index) => (
                                  <source
                                    key={index}
                                    src={video}
                                    type="video/mp4"
                                  />
                                )
                              )}
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Thông Tin Sản Phẩm</Card.Title>
                          <Form.Group className="mb-3">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nhập tên sản phẩm"
                              readOnly={auctionId}
                              value={auction?.product_id?.name}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Mô tả sản phẩm"
                              readOnly={auctionId}
                              value={auction?.product_id?.description}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Giá khởi điểm</Form.Label>
                            {/* <Form.Control
                              type="number"
                              placeholder="Giá khởi điểm"
                              readOnly={auctionId}
                              value={auction?.starting_price}
                            /> */}
                            {auction?.status === "not" ? (
                              <Form.Control
                                type="number"
                                placeholder="Giá khởi điểm"
                                value={startingPrice}
                                onChange={(e) =>
                                  setStartingPrice(e.target.value)
                                }
                              />
                            ) : (
                              <Form.Control
                                type="number"
                                placeholder="Giá khởi điểm"
                                readOnly={auctionId}
                                value={auction?.starting_price}
                              />
                            )}
                          </Form.Group>
                        </Card.Body>
                      </Card>
                      <Card style={{ marginTop: "10px" }}>
                        <Card.Body>
                          <Card.Title>
                            Số lượng người tham gia đấu giá
                          </Card.Title>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Số lượng: {filterNumberMemberJoinRoom.length}
                            </Form.Label>
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Card.Title>Thông Tin Auction</Card.Title>
                          <Form.Group className="mb-3">
                            <Form.Label>Thong tin dau gia</Form.Label>
                            {/* <Form.Control
                              as="textarea"
                              readOnly={auctionId}
                              rows={3}
                              placeholder="Thông tin đấu giá"
                              value={auction?.auctionInfo}
                            /> */}
                            {auction?.status === "not" ? (
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Thông tin đấu giá"
                                value={auctionInfo}
                                onChange={(e) => setAuctionInfo(e.target.value)}
                              />
                            ) : (
                              <Form.Control
                                as="textarea"
                                readOnly={auctionId}
                                rows={3}
                                placeholder="Thông tin đấu giá"
                                value={auction?.auctionInfo}
                              />
                            )}
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Bước giá tối thiểu</Form.Label>
                            {/* <Form.Control
                              type="number"
                              readOnly={auctionId}
                              placeholder="Minimun Price Step"
                              value={auction?.price_step}
                            /> */}
                            {auction?.status === "not" ? (
                              <Form.Control
                                type="number"
                                placeholder="Minimun Price Step"
                                value={stepPrice}
                                onChange={(e) => setStepPrice(e.target.value)}
                              />
                            ) : (
                              <Form.Control
                                type="number"
                                readOnly={auctionId}
                                placeholder="Minimun Price Step"
                                value={auction?.price_step}
                              />
                            )}
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian bắt đầu đăng kí</Form.Label>
                            {/* <Form.Control
                              type="datetime-local"
                              readOnly={auctionId}
                              value={
                                auction?.regitration_start_time
                                  ? format(
                                      new Date(auction.regitration_start_time),
                                      "yyyy-MM-dd'T'HH:mm"
                                    )
                                  : ""
                              }
                            /> */}
                            {auction?.status === "not" ? (
                              <Form.Control
                                type="datetime-local"
                                value={
                                  regitrationStartTime
                                    ? format(
                                        new Date(regitrationStartTime),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                                onChange={(e) =>
                                  setRegitrationStartTime(e.target.value)
                                }
                              />
                            ) : (
                              <Form.Control
                                type="datetime-local"
                                readOnly={auctionId}
                                value={
                                  auction?.regitration_start_time
                                    ? format(
                                        new Date(
                                          auction.regitration_start_time
                                        ),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                              />
                            )}
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian kết thúc đăng kí</Form.Label>
                            {(filterNumberMemberJoinRoom.length === 0 &&
                              auction?.status === "about to auction") ||
                            auction?.status === "not" ? (
                              <Form.Control
                                type="datetime-local"
                                // defaultValue={defaultRegisterEndTime}
                                value={
                                  regitrationEndTime
                                    ? format(
                                        new Date(regitrationEndTime),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                                onChange={(e) =>
                                  setRegitrationEndTime(e.target.value)
                                }
                              />
                            ) : (
                              <Form.Control
                                type="datetime-local"
                                readOnly={auctionId}
                                value={
                                  auction?.regitration_end_time
                                    ? format(
                                        new Date(auction.regitration_end_time),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                              />
                            )}
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian bắt đầu</Form.Label>
                            {(filterNumberMemberJoinRoom.length === 0 &&
                              auction?.status === "about to auction") ||
                            auction?.status === "not" ? (
                              <Form.Control
                                type="datetime-local"
                                // defaultValue={defaultStartTime}
                                value={
                                  startTime
                                    ? format(
                                        new Date(startTime),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                                onChange={(e) => setStartTime(e.target.value)}
                              />
                            ) : (
                              <Form.Control
                                type="datetime-local"
                                readOnly={auctionId}
                                value={
                                  auction?.start_time
                                    ? format(
                                        new Date(auction.start_time),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                              />
                            )}
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Thời gian kết thúc</Form.Label>
                            {(filterNumberMemberJoinRoom.length === 0 &&
                              auction?.status === "about to auction") ||
                            auction?.status === "not" ? (
                              <Form.Control
                                type="datetime-local"
                                value={
                                  endTime
                                    ? format(
                                        new Date(endTime),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                                // defaultValue={defaultEndTime}
                                onChange={(e) => setEndTime(e.target.value)}
                              />
                            ) : (
                              <Form.Control
                                type="datetime-local"
                                readOnly={auctionId}
                                value={
                                  auction?.end_time
                                    ? format(
                                        new Date(auction.end_time),
                                        "yyyy-MM-dd'T'HH:mm"
                                      )
                                    : ""
                                }
                              />
                            )}
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs="auto" className="mt-2">
                      <Button variant="warning" onClick={() => navigate(-1)}>
                        Back
                      </Button>
                    </Col>
                    {filterNumberMemberJoinRoom.length === 0 &&
                      auction?.status === "about to auction" && (
                        <Col xs="auto" className="mt-2">
                          <Button
                            variant="success"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Update Time
                          </Button>
                        </Col>
                      )}
                    {auction?.status === "not" && (
                      <Col xs="auto" className="mt-2">
                        <Button
                          variant="success"
                          onClick={(e) => handleSubmitNotStatus(e)}
                        >
                          Update Auction
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal
          show={showModalNotStatus}
          onHide={() => navigate("/manage-auction")}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận lỗi cập nhật đấu giá</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Thời gian bắt đầu đăng kí cho buổi đấu giá đã diễn ra! Cập nhật thất
            bại
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => navigate("/manage-auction")}
            >
              Trở về
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showModal} onHide={() => navigate("/manage-auction")}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận lỗi cập nhật thời gian đấu giá</Modal.Title>
          </Modal.Header>
          <Modal.Body>Buổi đấu giá đang diễn ra! Cập nhật thất bại</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => navigate("/manage-auction")}
            >
              Trở về
            </Button>
          </Modal.Footer>
        </Modal>
        {isSubmitting ? (
          <>
            <div className="overlay1"></div>
            <div className="spinner-container1">
              <FaSpinner />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default AuctionDetail;
