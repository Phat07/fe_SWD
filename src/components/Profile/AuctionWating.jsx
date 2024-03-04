import React, { useState } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import ModalConfirmDeleteWating from "./ModalConfirmDeleteWating"; // Make sure this is adapted to use React Bootstrap as well
import TableAutionWating from "./TableAutionWating";
import ChangeTabAutionWating from "./ChangeTabAutionWating";
import { useNavigate } from "react-router-dom";

function AuctionWating() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [data, setData] = useState([
    { id: 1, name: "Aution 1", status: "chưa diễn ra" },
    { id: 2, name: "Aution 2", status: "chưa diễn ra" },
    // Add more sample data here
  ]);

  const data1 = [
    { id: 3, name: "Aution 3", status: "sắp diễn ra" },
    { id: 4, name: "Aution 4", status: "sắp diễn ra" },
    // Thêm dữ liệu mẫu khác tại đây
  ];
  // Define other data arrays similarly

  const navigate = useNavigate();

  const handleDelete = (auction) => {
    console.log("Delete item with id:", auction.id);
    setDeleteData(auction);
    setShowDelete(true);
  };

  const handleDetailAuction = (auction) => {
    navigate(`/auction-detail/${auction.id}`);
    console.log("Update user at id:", auction.id);
  };

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
                  data={data}
                  onUpdate={handleDetailAuction}
                  onDelete={handleDelete}
                />
              }
              sapDienRaContent={
                <TableAutionWating
                  data={data1}
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
