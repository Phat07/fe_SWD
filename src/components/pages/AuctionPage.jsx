import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "../../css/auction.css";
import { Button, Card, Pagination } from "react-bootstrap";
// import ReactPaginate from 'react-paginate';

function AuctionPage(props) {
  const location = useLocation();
  const [search] = useSearchParams();
  console.log("location", location.search);
  console.log("search", search.get("search"));
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
  const [viewMode, setViewMode] = useState("mode1"); // State để lưu trữ chế độ hiển thị

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

  // Hàm chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}>
          <div
            style={{
              paddingTop: "32px",
              paddingBottom: "26px",
              borderBottom: "1px solid #E0E0E0",
              backgroundImage:
                "url('../../../public/assets/images/background/auction.png')",
              backgroundPosition: "right",
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
                Cuộc đấu giá
              </span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row high-padding">
            <div className="col-lg-3 col-md-4 sidebar-content">
              <div className="blog-widget-item fadeInUp">
                <div className="search-area">
                  <div className="sidebar-widget-title">Tìm kiếm</div>
                  <div className="blog-widget-body">form</div>
                </div>
              </div>
              <aside className="widget">
                <div className="blog-widget-item fadeInUp">
                  <div className="search-area">
                    <div className="sidebar-widget-title">Tìm kiếm</div>
                    <div className="blog-widget-body">form</div>
                  </div>
                </div>
              </aside>
              <aside className="widget">
                <div className="blog-widget-item fadeInUp">
                  <div className="search-area">
                    <div className="sidebar-widget-title">Tìm kiếm</div>
                    <div className="blog-widget-body">form</div>
                  </div>
                </div>
              </aside>
              <aside className="widget">
                <div className="blog-widget-item fadeInUp">
                  <div className="search-area">
                    <div className="sidebar-widget-title">Tìm kiếm</div>
                    <div className="blog-widget-body">form</div>
                  </div>
                </div>
              </aside>
            </div>
            <div className="col-lg-9 col-md-8" style={{ position: "relative" }}>
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
                {/* Hiển thị danh sách sản phẩm */}
                {currentCards.map((card) => (
                  <div
                    key={card.id}
                    className={` ${
                      viewMode === "mode2" ? "col-lg-3" : "col-lg-3"
                    } col-md-2 ${viewMode === "mode2" ? "mb-2" : ""}`}
                  >
                    <Card
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
                            src={card.image}
                            style={{
                              width: `${viewMode === "mode2" ? "200px" : ""}`,
                            }}
                          />
                        </div>
                        <div>
                          <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.content}</Card.Text>
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
                  bottom: `${viewMode === "mode2" ? "0%" : "0%"}`,
                  left: "35%",
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
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default AuctionPage;
