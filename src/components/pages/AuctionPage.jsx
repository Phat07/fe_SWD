import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "../../css/auction.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, Container, Pagination } from "react-bootstrap";
// import ReactPaginate from 'react-paginate';
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
function AuctionPage(props) {
  const location = useLocation();
  const [search] = useSearchParams();
  console.log("location", location.search);
  console.log("search", search.get("search"));
  const auctions = useSelector((state) => state.AUCTION.auctions);
  console.log("allAuction", auctions);
  const data = [
    {
      id: 1,
      title: "Card 1",
      content: "Content of card 1",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 2,
      title: "Card 2",
      content: "Content of card 2",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 3,
      title: "Card 3",
      content: "Content of card 3",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 4,
      title: "Card 4",
      content: "Content of card 4",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 5,
      title: "Card 5",
      content: "Content of card 5",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 6,
      title: "Card 6",
      content: "Content of card 6",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 7,
      title: "Card 7",
      content: "Content of card 7",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 8,
      title: "Card 8",
      content: "Content of card 8",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 9,
      title: "Card 9",
      content: "Content of card 9",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 10,
      title: "Card 10",
      content: "Content of card 10",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 11,
      title: "Card 11",
      content: "Content of card 11",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 12,
      title: "Card 12",
      content: "Content of card 12",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 13,
      title: "Card 13",
      content: "Content of card 13",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 14,
      title: "Card 14",
      content: "Content of card 14",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 15,
      title: "Card 15",
      content: "Content of card 15",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 16,
      title: "Card 16",
      content: "Content of card 16",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 17,
      title: "Card 17",
      content: "Content of card 17",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 18,
      title: "Card 18",
      content: "Content of card 18",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 19,
      title: "Card 19",
      content: "Content of card 19",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 20,
      title: "Card 20",
      content: "Content of card 20",
      image: "../../../public/assets/images/background/background3.jpg",
    },
  ];
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [viewMode, setViewMode] = useState("mode1"); // State để lưu trữ chế độ hiển thị
  const [selectedValue, setSelectedValue] = useState("not yet auctioned");
  const [searchKeyword, setSearchKeyword] = useState(""); // State to manage the input value

  const handleSelect = (value) => {
    setSelectedValue(value);
    // Perform additional actions as needed
  };
  const toggleViewMode = () => {
    setViewMode(viewMode === "mode1" ? "mode2" : "mode1"); // Chuyển đổi giữa hai chế độ hiển thị
  };
  // Thêm dữ liệu card khác ở đây

  // State để lưu trữ trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  console.log("time-start", startDate);
  console.log("time-end", endDate);
  // Hàm chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Container className="mb-3">
      <div className="app-container">
        {/* <div className="header-container">
        <Header />
      </div> */}
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
                          // position: "absolute",
                          // width: "70%",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Nhập từ khóa..."
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)} // Update the searchKeyword state
                        />

                        {/* <FaCalendarAlt className="calendar-icon" /> */}
                      </div>
                      <div class="date-range">
                        <div class="input-with-date">
                          {/* <span>Từ ngày</span> */}
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
                        <div class="input-with-date">
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
                      {/* <Button
                        style={{
                          marginTop: "20px",
                          backgroundColor: "#B41712",
                          border: "none",
                          fontWeight: "700",
                          fontSize: "900",
                          width: "70px",
                        }}
                      >
                        LỌCs
                      </Button> */}
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
                            onChange={() => handleSelect("not yet auctioned")}
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
                </div>
                <div
                  className="row"
                  style={{
                    position: "absolute",
                    bottom: `${viewMode === "mode2" ? "0%" : "-12%"}`,
                    left: "35%",
                    // marginTop:"20px"
                  }}
                >
                  <Pagination>
                    {Array.from({
                      length: Math.ceil(data.length / cardsPerPage),
                    }).map((item, index) => (
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
        {/* <div
        className="footer-container"
        style={{
          marginTop: `${viewMode === "mode2" ? "" : "75px"}`,
        }}
      >
        <Footer />
      </div> */}
      </div>
    </Container>
  );
}

export default AuctionPage;
