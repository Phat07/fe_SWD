import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import TableAutionUser from "./TableAutionUser";
import Header from "../../Header";
import Footer from "../../Footer";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  actAuctionGetAsync,
  actAboutToAuctionCustomerGetAsync,
  actNotAuctionCustomerGetAsync,
} from "../../../store/auction/action";

function AboutToAuctionUser() {
  // Define other data arrays similarly
  const token = localStorage.getItem("ACCESS_TOKEN");
  const aboutToCustomer = useSelector(
    (state) => state.AUCTION.notAuctionCustomer
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  useEffect(() => {
    dispatch(actAuctionGetAsync(token));
    dispatch(actAboutToAuctionCustomerGetAsync(token));
    dispatch(actNotAuctionCustomerGetAsync(token));
  }, [user]);
  const navigate = useNavigate();

  const handleDetailAuction = (auction) => {
    navigate(`/detail/${auction._id}`);
    console.log("Update user at id:", auction._id);
  };
  useEffect(() => {
    // Kết nối tới Socket.IO server
    const socket = socketIOClient("http://localhost:3001"); // Thay đổi URL và cổng tùy theo cấu hình của bạn

    // Lắng nghe thông báo từ server khi trạng thái của phiên đấu giá thay đổi
    socket.on("auction_status_changed", () => {
      dispatch(actAboutToAuctionCustomerGetAsync(token));
      console.log("Auction status changed");
      // Gọi lại các API để cập nhật danh sách các phiên đấu giá
      // fetchAuctions();
    });

    return () => {
      // Đóng kết nối Socket.IO khi component unmount
      socket.disconnect();
    };
  }, []);
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
              <Card.Header className="d-flex justify-content-center align-items-center">
                <strong>Danh sách các buổi đấu giá đã sắp đấu giá</strong>
              </Card.Header>
              <Card.Body>
                {/* <div className="d-flex justify-content-between align-items-center">
                  <p className="text-medium-emphasis small mb-2">
                    Display auctions in the system
                  </p>
                </div> */}
                <TableAutionUser
                  data={aboutToCustomer}
                  onUpdate={handleDetailAuction}
                />
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

export default AboutToAuctionUser;
