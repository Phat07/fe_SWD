import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Image,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../css/header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   const interval = setInterval(changeBackground, 5000); // Change background every 5 seconds
  //   return () => clearInterval(interval);
  // }, [backgroundIndex]);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // const changeBackground = () => {
  //   setBackgroundIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  // };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Xử lý tìm kiếm khi nhấn phím "Enter" ở đây
      console.log("Searching for:", searchValue);
      setShowPopup(false);
      navigate(`/auction?search=${searchValue}`);
    }
  };
  return (
    <div style={{ position: "relative" }}>
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
            <Col md={5}>
              <Navbar bg="#ffff" style={{ fontWeight: "500" }} expand="md">
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                  <Nav className="mr-auto">
                    <Nav.Link
                      href="#"
                      className="mr-md-6"
                      style={{ marginRight: "100px" }}
                    >
                      Home
                    </Nav.Link>
                    <div
                      className="dropdown"
                      onMouseEnter={toggleDropdown}
                      onMouseLeave={toggleDropdown}
                    >
                      <Nav.Link
                        href="#"
                        className="products-link"
                        style={{
                          color: showDropdown ? "#3A43A7" : "black",
                          // backgroundColor: showDropdown
                          //   ? "#F6F7F8"
                          //   : "transparent",
                          width: "160px",
                        }}
                      >
                        Products
                      </Nav.Link>
                      {showDropdown && (
                        <div className="dropdown-content">
                          <Link to="#">Auction Item</Link>
                          <Link to="#">Cart</Link>
                        </div>
                      )}
                    </div>
                    <Nav.Link
                      href="#"
                      className="mr-md-6"
                      style={{ marginRight: "100px" }}
                    >
                      About
                    </Nav.Link>
                    <Nav.Link
                      href="#"
                      className="mr-md-6"
                      style={{ marginRight: "100px" }}
                    >
                      Contact
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>

            <Col
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              <div>
                <strong>{currentTime.toLocaleTimeString()}</strong>
                <br />
                {formatDate(currentTime)}
              </div>
            </Col>
            {/* Login Section */}
            <Col md={1}>
              <div className="search-btn" onClick={togglePopup}>
                <p>
                  <FaSearch />
                </p>
              </div>
            </Col>
            <Col
              md={1}
              className="d-flex justify-content-end align-items-center"
            >
              {/* <Link to={"/login"}>
                <Button variant="outline-primary" style={{ color: "black" }}>
                  Login
                </Button>
              </Link> */}
              {user ? (
                <>
                  <Image
                    src={user.image}
                    alt="Orchid"
                    style={{ width: "50%", height: "auto" }}
                    roundedCircle
                    onClick={() => navigate(`/profile`)}
                  />
                </>
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
