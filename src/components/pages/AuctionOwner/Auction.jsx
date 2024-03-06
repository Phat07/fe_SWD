import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import ModalConfirmDelete from "./ModalConfirmDelete"; // Make sure this is adapted to use React Bootstrap as well
import TableAution from "./TableAution";
import ChangeTabAution from "./ChangeTabAution"; // This might need adjustments for Bootstrap components
import Header from "../../Header";
import Footer from "../../Footer";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  actAboutToAuctionGetAsync,
  actAuctionGetAsync,
  actAuctionedAuctionGetAsync,
  actAuctioningAuctionGetAsync,
  actNotYetAuctionGetAsync,
} from "../../../store/auction/action";

function Auction() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [data, setData] = useState([
    { id: 1, name: "Aution 1", status: "active" },
    { id: 2, name: "Aution 2", status: "active" },
    // Add more sample data here
  ]);

  const data1 = [
    { id: 3, name: "Aution 3", status: "active" },
    { id: 4, name: "Aution 4", status: "active" },
    // Thêm dữ liệu mẫu khác tại đây
  ];
  const [data2, setData2] = useState([
    { id: 5, name: "Aution 5", status: "active" },
    { id: 6, name: "Aution 6", status: "active" },
    // Thêm dữ liệu mẫu khác tại đây
  ]);
  const [data3, setData3] = useState([
    { id: 7, name: "Aution 7", status: "active" },
    { id: 8, name: "Aution 8", status: "active" },
    // Thêm dữ liệu mẫu khác tại đây
  ]);
  // Define other data arrays similarly
  const token = localStorage.getItem("ACCESS_TOKEN");

  const auctions = useSelector((state) => state.AUCTION.auctions);
  const notYetAuction = useSelector((state) => state.AUCTION.notYetAuction);
  const aboutToAuction = useSelector((state) => state.AUCTION.aboutToAuction);
  const auctioning = useSelector((state) => state.AUCTION.auctioning);
  const auctined = useSelector((state) => state.AUCTION.auctined);
  console.log("auctions", auctions);
  console.log("notYetAuction", notYetAuction);
  console.log("aboutToAuction", aboutToAuction);
  console.log("auctioning", auctioning);
  console.log("auctined", auctined);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  useEffect(() => {
    dispatch(actAuctionGetAsync(token));
    dispatch(actNotYetAuctionGetAsync(user?._id, token));
    dispatch(actAboutToAuctionGetAsync(user?._id, token));
    dispatch(actAuctioningAuctionGetAsync(user?._id, token));
    dispatch(actAuctionedAuctionGetAsync(user?._id, token));
  }, [user]);
  const navigate = useNavigate();

  const handleDelete = (auction) => {
    console.log("Delete item with id:", auction._id);
    setDeleteData(auction);
    setShowDelete(true);
  };

  const handleDetailAuction = (auction) => {
    navigate(`/auction-detail/${auction._id}`);
    console.log("Update user at id:", auction._id);
  };
  useEffect(() => {
    // Kết nối tới Socket.IO server
    const socket = socketIOClient("http://localhost:3001"); // Thay đổi URL và cổng tùy theo cấu hình của bạn

    // Lắng nghe thông báo từ server khi trạng thái của phiên đấu giá thay đổi
    socket.on("auction_status_changed", () => {
      dispatch(actNotYetAuctionGetAsync(user?._id, token));
      dispatch(actAboutToAuctionGetAsync(user?._id, token));
      dispatch(actAuctioningAuctionGetAsync(user?._id, token));
      dispatch(actAuctionedAuctionGetAsync(user?._id, token));
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
              <Card.Header>
                <strong>Auction</strong>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-medium-emphasis small mb-0">
                    Display auctions in the system
                  </p>
                  <Button
                    variant="success"
                    onClick={() => {
                      navigate(`/create-auction`);
                    }}
                  >
                    Create New Auction
                  </Button>
                </div>
                <ChangeTabAution
                  chuaDienRaContent={
                    <TableAution
                      data={notYetAuction}
                      onUpdate={handleDetailAuction}
                      onDelete={handleDelete}
                    />
                  }
                  sapDienRaContent={
                    <TableAution
                      data={aboutToAuction}
                      onUpdate={handleDetailAuction}
                      onDelete={handleDelete}
                    />
                  }
                  dangDienRaContent={
                    <TableAution
                      data={auctioning}
                      onUpdate={handleDetailAuction}
                      onDelete={handleDelete}
                    />
                  }
                  daDienRaContent={
                    <TableAution
                      data={auctined}
                      onUpdate={handleDetailAuction}
                      onDelete={handleDelete}
                    />
                  }
                />
              </Card.Body>
            </Card>
          </Col>
          <ModalConfirmDelete
            showProp={showDelete} // Ensure ModalConfirmDelete is adapted for React Bootstrap
            handleClose={() => setShowDelete(false)}
            deleteData={deleteData}
          />
        </Row>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Auction;
