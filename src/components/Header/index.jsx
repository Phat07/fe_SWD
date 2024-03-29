import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Image,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FaSearch, FaLock, FaUser, FaMoneyBill } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../css/header.css";
import { useSelector } from "react-redux";
import CurrentTime from "./currentTime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  // const [currentTime, setCurrentTime] = React.useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const user = useSelector((state) => state.USER.currentUser);
  const navigate = useNavigate();

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  // const changeBackground = () => {
  //   setBackgroundIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  // };

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Xử lý tìm kiếm khi nhấn phím "Enter" ở đây
      setShowPopup(false);
      navigate(`/auction?search=${searchValue}`);
    }
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm khi nhấn phím "Enter" ở đây
    localStorage.removeItem("ACCESS_TOKEN");
    navigate(`/login`);
  };
  return (
    <div style={{ position: "relative" }}>
      <ToastContainer position="top-right" autoClose={2000} />
      <header style={{ padding: "20px", zIndex: 1 }}>
        <Container fluid>
          <Row>
            {/* Logo */}
            <Col md={3}>
              <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                <h1 className="logo" style={{ cursor: "pointer" }}>
                  Auction Orchid
                </h1>
              </Link>
            </Col>

            {/* Navbar */}
            <Col md={3}>
              <Navbar bg="#ffff" style={{ fontWeight: "500" }} expand="md">
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                  <Nav className="mr-auto">
                    {user?.role_id?.title === "HOST" ? (
                      <div style={{ marginTop: "10px" }}>
                        <Link
                          to="/manage-auction"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            marginRight: "50px",
                            paddingTop: "200px",
                          }}
                        >
                          Cuộc đấu giá
                        </Link>
                        <Link
                          to="/manage-product"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Sản phẩm cho đấu giá
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Nav.Link
                          className="md-6"
                          style={{ marginRight: "10px" }}
                        >
                          <Link
                            to={"/notyetauction-customer"}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Danh sách công bố
                          </Link>
                        </Nav.Link>
                        <Nav.Link
                          className="md-6"
                          style={{ marginRight: "10px" }}
                        >
                          <Link
                            to={"/notauction-customer"}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Danh sách sắp công bố
                          </Link>
                        </Nav.Link>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col
              md={4}
              className="d-flex justify-content-end align-items-center"
            >
              <CurrentTime />
            </Col>
            <Col
              md={1}
              className="d-flex justify-content-center align-items-center"
            >
              {user ? (
                <Dropdown
                  show={show}
                  onToggle={() => setShow(!show)}
                  align={{ lg: "end" }}
                  className="d-flex justify-content-end align-items-center"
                >
                  <Image
                    onClick={toggleShow}
                    src={user.image}
                    alt="User"
                    style={{ width: "50%", height: "auto", cursor: "pointer" }}
                    roundedCircle
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="/profile"
                      eventKey="1"
                      className="d-flex justify-content-left align-items-center"
                    >
                      <FaUser style={{ marginRight: "5px" }} />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      href="#"
                      className="d-flex justify-content-left align-items-center"
                      onClick={(e) => {
                        handleLogOut(e);
                        // Optionally add any action to redirect or refresh the page after logout
                      }}
                    >
                      <FaLock style={{ marginRight: "5px" }} /> Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <a href="/login">
                    <button
                      className="login-button-red"
                      style={{ fontWeight: "500" }}
                    >
                      Login
                    </button>
                  </a>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </header>
      {showPopup && (
        <div className={`search-popup ${showPopup ? "active" : ""}`}>
          <div className="search-popup-content" style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={togglePopup}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
