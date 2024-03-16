import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "../../css/auction.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, Container, Pagination } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

function AuctionPage(props) {
  const location = useLocation();
  const [search] = useSearchParams();
  console.log("location", location.search);
  console.log("search", search.get("search"));
  const auctions = useSelector((state) => state.AUCTION.auctions);
  console.log("allAuction", auctions);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [viewMode, setViewMode] = useState("mode2");
  const [selectedValue, setSelectedValue] = useState("not yet auctioned");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State lưu trữ trang hiện tại
  const cardsPerPage = 4;

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "mode1" ? "mode2" : "mode1");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(
    auctions.filter(
      (auction) =>
        auction.product_id.name
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) &&
        ((selectedValue === "not yet auctioned" &&
          auction.status === "not yet auctioned") ||
          (selectedValue === "about to auction" &&
            auction.status === "about to auction") ||
          (selectedValue === "auctioning" &&
            auction.status === "auctioning") ||
          (selectedValue === "auctioned" && auction.status === "auctioned")) &&
        (!startDate ||
          !endDate ||
          (startDate &&
            endDate &&
            new Date(auction.registration_start_time) >= startDate &&
            new Date(auction.endTime) <= endDate))
    ).length / cardsPerPage
  );

  return (
    <Container className="mb-3">
      <div className="app-container">
        <div className="body-container">
          <div className="container" style={{ marginBottom: "20px" }}>
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
            </div>
          </div>
          <div className="container">
            <div className="row high-padding">
              <div className="col-lg-3 col-md-4 sidebar-content">
                <div className="blog-widget-item fadeInUp">
                  <div className="search-area">
                    <div className="sidebar-widget-title">
                      <div className="sidebar-widget-title-text">
                        <h4>Tìm Kiếm</h4>
                        <span className="hight-light"></span>
                      </div>
                      <div className="sidebar-widget-title-tools"></div>
                    </div>
                    <div
                      className="blog-widget-body"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="input-with-icon"
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Nhập từ khóa..."
                          value={searchKeyword}
                          onChange={(e) =>
                            setSearchKeyword(e.target.value)
                          }
                        />
                      </div>
                      <div className="date-range">
                        <div className="input-with-date">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Từ ngày"
                          />
                          <FaCalendarAlt className="calendar-icon" />
                        </div>
                        <div className="input-with-date">
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="Đến ngày"
                          />
                          <FaCalendarAlt className="calendar-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="widget">
                  <div className="blog-widget-item fadeInUp">
                    <div className="search-area">
                      <div className="sidebar-widget-title">
                        <div className="sidebar-widget-title-text">
                          <h4>Trạng thái tài sản</h4>
                          <span className="hight-light"></span>
                        </div>
                        <div className="sidebar-widget-title-tools"></div>
                      </div>
                      <div className="blog-widget-body">
                        <label
                          className={`custom-checkbox ${
                            selectedValue === "not yet auctioned" && "active"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value="not yet auctioned"
                            checked={selectedValue === "not yet auctioned"}
                            onChange={() =>
                              handleSelect("not yet auctioned")
                            }
                          />
                          Chưa diễn ra
                        </label>
                        <label
                          className={`custom-checkbox ${
                            selectedValue === "about to auction" && "active"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value="about to auction"
                            checked={selectedValue === "about to auction"}
                            onChange={() => handleSelect("about to auction")}
                          />
                          Sắp diễn ra
                        </label>
                        <label
                          className={`custom-checkbox ${
                            selectedValue === "auctioning" && "active"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value="auctioning"
                            checked={selectedValue === "auctioning"}
                            onChange={() => handleSelect("auctioning")}
                          />
                          Đang diễn ra
                        </label>
                        <label
                          className={`custom-checkbox ${
                            selectedValue === "auctioned" && "active"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value="auctioned"
                            checked={selectedValue === "auctioned"}
                            onChange={() => handleSelect("auctioned")}
                          />
                          Đã kết thúc
                        </label>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              <div
                className="col-lg-9 col-md-8"
                style={{ position: "relative", marginBottom: "1px" }}
              >
                <div className="view-list">
                  <Button onClick={toggleViewMode}>
                    {viewMode === "mode1" ? "Chế độ 1" : "Chế độ 2"}
                  </Button>
                </div>
                <div
                  className={`row gy-4 mb-60 d-flex list-item ${
                    viewMode === "mode2" ? "flex-column" : ""
                  }`}
                  style={{
                    marginBottom: `${viewMode === "mode2" ? "70px" : ""}`,
                  }}
                >
                  {auctions
                    .filter(
                      (auction) =>
                        auction.product_id.name
                          .toLowerCase()
                          .includes(searchKeyword.toLowerCase()) &&
                        ((selectedValue === "not yet auctioned" &&
                          auction.status === "not yet auctioned") ||
                          (selectedValue === "about to auction" &&
                            auction.status === "about to auction") ||
                          (selectedValue === "auctioning" &&
                            auction.status === "auctioning") ||
                          (selectedValue === "auctioned" &&
                            auction.status === "auctioned")) &&
                        (!startDate ||
                          !endDate ||
                          (startDate &&
                            endDate &&
                            new Date(auction.registration_start_time) >=
                              startDate &&
                            new Date(auction.endTime) <= endDate))
                    )
                    .slice(
                      (currentPage - 1) * cardsPerPage,
                      currentPage * cardsPerPage
                    )
                    .map((card) => (
                      <div
                        key={card.id}
                        className={` ${
                          viewMode === "mode2" ? "col-lg-3" : "col-lg-3"
                        } col-md-2 ${viewMode === "mode2" ? "mb-2" : ""}`}
                      >
                        <Card
                          className="card_auction"
                          style={{
                            width: `${viewMode === "mode2" ? "800px" : ""}`,
                          }}
                        >
                          <div
                            style={{
                              display: `${viewMode === "mode2" ? "flex" : ""}`,
                            }}
                          >
                            <div>
                              <Card.Img
                                variant="top"
                                src={card?.product_id?.image[0]}
                                style={{
                                  width: `${
                                    viewMode === "mode2" ? "200px" : ""
                                  }`,
                                }}
                              />
                            </div>
                            <div>
                              <Card.Body>
                                <Card.Title>
                                  {card?.product_id?.name}
                                </Card.Title>
                                <Card.Text>
                                  {card?.product_id?.description}
                                </Card.Text>
                                <Link to={`/detail/${card._id}`}>
                                  <Button>Chi tiết</Button>
                                </Link>
                              </Card.Body>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  <div
                    className="row"
                    style={{
                      position: "absolute",
                      bottom: `${viewMode === "mode2" ? "0%" : "-12%"}`,
                      left: "35%",
                    }}
                  >
                    <Pagination>
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AuctionPage;
