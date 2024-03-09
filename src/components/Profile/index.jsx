import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Row,
  ToggleButton,
  Container,
  Nav,
} from "react-bootstrap";
import AccountInfo from "./AccountInfo";
import Header from "../Header";
import Footer from "../Footer";
import CartAuction from "./Cart";
import AuctionWating from "./AuctionWating";
import AuctionHistory from "./AuctionHistory";
import HistoryTransaction from "./HistoryTransaction";
import HistoryDeposit from "./HistoryDeposit";
import PaidItem from "../pages/PaidItem";
import { useDispatch, useSelector } from "react-redux";
import { actGetWalletByUserAsync } from "../../store/wallet/action";

function Profile() {
  const [status, setStatus] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetWalletByUserAsync(user?._id, token));
  }, [user]);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const renderContent = () => {
    switch (status) {
      case "account":
        return <AccountInfo />;
      case "cart":
        return <CartAuction />;
      case "auction":
        return <AuctionWating />;
      case "history":
        return <AuctionHistory />;
      case "nap tien":
        return <PaidItem />;
      case "lich su nap tien":
        return <HistoryDeposit />;
      case "lich su giao dich":
        return <HistoryTransaction />;
      default:
        return <div>Chọn một mục</div>;
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}></div>
        <Container fluid className="mt-4">
          <Row>
            <Col md={3} className="mb-3">
              <Card className="mb-4">
                <Card.Header>
                  <strong>Thông Tin Chi Tiết </strong>
                </Card.Header>
                <Card.Body>
                  <Nav
                    className="flex-column"
                    variant="pills"
                    defaultActiveKey="account"
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="account"
                        onClick={() => setStatus("account")}
                      >
                        Thông tin tài khoản
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="nap tien"
                        onClick={() => setStatus("nap tien")}
                      >
                        Nạp tiền
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="cart"
                        onClick={() => setStatus("cart")}
                      >
                        Giỏ hàng
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="auction"
                        onClick={() => setStatus("auction")}
                      >
                        Hoa lan chờ đấu giá
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="history"
                        onClick={() => setStatus("history")}
                      >
                        Lịch sử đấu giá
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="lich su nap tien"
                        onClick={() => setStatus("lich su nap tien")}
                      >
                        Lịch sử nạp tiền
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="lich su giao dich"
                        onClick={() => setStatus("lich su giao dich")}
                      >
                        Lịch sử giao dịch
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>
            <Col md={9}>{renderContent()}</Col>
          </Row>
        </Container>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

// Components for Cart, Auction, History, Documents can be defined here following the AccountInfo structure.

export default Profile;
