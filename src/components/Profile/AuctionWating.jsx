import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import ModalConfirmDeleteWating from "./ModalConfirmDeleteWating"; // Make sure this is adapted to use React Bootstrap as well
import TableAutionWating from "./TableAutionWating";
import ChangeTabAutionWating from "./ChangeTabAutionWating";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";

import {
  actAuctionAboutToMemberGetAsync,
  actAuctionNotYetMemberGetAsync,
  actAuctionedMemberGetAsync,
  actAuctioningMemberGetAsync,
} from "../../store/auction/action";

function AuctionWating() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.USER.currentUser);
  const token = localStorage.getItem("ACCESS_TOKEN");

  // Define other data arrays similarly

  const auctionNotYetMember = useSelector(
    (state) => state.AUCTION.notYetAuctionMember
  );
  const auctionAboutToMember = useSelector(
    (state) => state.AUCTION.aboutToAuctionMember
  );
  const auctioningMember = useSelector(
    (state) => state.AUCTION.auctioningMember
  );
  const auctionedMember = useSelector((state) => state.AUCTION.auctinedMember);

  console.log("not yet", auctionNotYetMember);
  console.log("about to", auctionAboutToMember);
  console.log("aucting", auctioningMember);
  console.log("auctioned", auctionedMember);
  const handleDelete = (auction) => {
    console.log("Delete item with id:", auction.id);
    setDeleteData(auction);
    setShowDelete(true);
  };

  const handleDetailAuction = (auction) => {
    navigate(`/auction-detail/${auction}`);
    console.log("Update user at id:", auction.id);
  };
  useEffect(() => {
    // Kết nối tới Socket.IO server
    const socket = socketIOClient("https://be-orchid-auction.onrender.com"); // Thay đổi URL và cổng tùy theo cấu hình của bạn

    // Lắng nghe thông báo từ server khi trạng thái của phiên đấu giá thay đổi
    socket.on("auction_status_changed", () => {
      // dispatch(actNotYetAuctionGetAsync(user?._id, token));
      // dispatch(actAboutToAuctionGetAsync(user?._id, token));
      // dispatch(actAuctioningAuctionGetAsync(user?._id, token));
      // dispatch(actAuctionedAuctionGetAsync(user?._id, token));
      // member
      dispatch(actAuctionNotYetMemberGetAsync(user?._id, token));
      dispatch(actAuctionAboutToMemberGetAsync(user?._id, token));
      dispatch(actAuctioningMemberGetAsync(user?._id, token));
      dispatch(actAuctionedMemberGetAsync(user?._id, token));
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
    <Row>
      <Col xs={12}>
        <Card className="mb-4">
          <Card.Header>
            <strong>Hoa lan chờ đấu giá</strong>
          </Card.Header>
          <Card.Body>
            <ChangeTabAutionWating
              chuaDienRaContent={
                <TableAutionWating
                  data={auctionNotYetMember}
                  onUpdate={handleDetailAuction}
                  onDelete={handleDelete}
                />
              }
              sapDienRaContent={
                <TableAutionWating
                  data={auctionAboutToMember}
                  onUpdate={handleDetailAuction}
                />
              }
              dangDienRaContent={
                <TableAutionWating
                  data={auctioningMember}
                  onUpdate={handleDetailAuction}
                />
              }
            />
          </Card.Body>
        </Card>
      </Col>
      <ModalConfirmDeleteWating
        showProp={showDelete} // Ensure ModalConfirmDelete is adapted for React Bootstrap
        handleClose={() => setShowDelete(false)}
        deleteData={deleteData}
      />
    </Row>
  );
}

export default AuctionWating;
