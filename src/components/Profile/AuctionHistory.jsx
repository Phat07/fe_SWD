import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Badge,
  Table,
} from "react-bootstrap";
import ModalConfirmDelete from "../pages/AuctionOwner/ModalConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuctionHistory = () => {
  const navigate = useNavigate();
  const data = [
    { id: 3, name: "Aution 3", status: "Chưa thanh toán" },
    { id: 4, name: "Aution 4", status: "Chưa thanh toán" },
  ];
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const handleDelete = (auction) => {
    setDeleteData(auction);
    setShowDelete(true);
  };
  const auctionedMember = useSelector((state) => state.AUCTION.auctinedMember);
  const handleDetailAuction = (auction) => {
    navigate(`/auction-detail/${auction}`);
  };
  return (
    <Row>
      <Col xs={12}>
        <Card className="mb-4">
          <Card.Header>
            <strong>Lịch sử đấu giá</strong>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs="auto">
                {/* Sử dụng xs="auto" để ô chỉ chiếm không gian cần thiết */}
                <Form className="d-flex mb-3" role="search">
                  <Form.Control
                    className="me-2"
                    type="search"
                    placeholder="Search Name Auction"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" type="submit">
                    Search
                  </Button>
                </Form>
              </Col>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Idex</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {auctionedMember?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.product?.name}</td>
                      <td>
                        {/* {item.status === "Chưa thanh toán" ? (
                          <Badge bg="success">Đã kết thúc</Badge>
                        ) : (
                          <Badge bg="warning">Not Active</Badge>
                        )} */}
                        <Badge bg="danger">{item?.status}</Badge>
                      </td>
                      <td>
                        {/* <Button
                          variant="success"
                          onClick={() => handleDetailAuction(item?.auction_id)}
                        >
                          Detail
                        </Button> */}
                        <Button
                          variant="success"
                          onClick={() =>
                            navigate(`/join-room-auction/${item?.auction_id}`)
                          }
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Card.Body>
        </Card>
        <ModalConfirmDelete
          showProp={showDelete} // Ensure ModalConfirmDelete is adapted for React Bootstrap
          handleClose={() => setShowDelete(false)}
          deleteData={deleteData}
        />
      </Col>
    </Row>
  );
};

export default AuctionHistory;
