import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  actOrderByHostGetAsync,
  actOrderByMemberGetAsync,
} from "../../store/order/action";

const HistoryTransaction = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const user = useSelector((state) => state.USER.currentUser);
  const navigate = useNavigate();
  const orders = useSelector((state) => state.ORDER.orders);
  const dispatch = useDispatch();
  const orderMember = useSelector((state) => state.ORDER.ordersByMember);
  const orderHost = useSelector((state) => state.ORDER.ordersByHost);
  console.log("orderMember", orderMember);
  useEffect(() => {
    dispatch(actOrderByMemberGetAsync(user?._id, token));
    dispatch(actOrderByHostGetAsync(user?._id, token));
  }, [user]);

  function formatCurrencyVND(amount) {
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  const handleOpenWinnerModal = (winnerInfo) => {
    setWinnerInfo(winnerInfo);
    setShowWinnerModal(true);
  };
  console.log("orderHost", orderHost);
  const handleCloseWinnerModal = () => {
    setShowWinnerModal(false);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
  return (
    <Row>
      <Col xs={12}>
        <Card className="mb-4">
          <Card.Header>
            <strong>Lịch sử giao dịch</strong>
          </Card.Header>
          <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Row>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Money</th>
                    <th>Status</th>
                    <th>Date Accept</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.role_id?.title === "HOST" ? (
                    <>
                      {orderHost?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatCurrencyVND(item.price)}</td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() =>
                                handleOpenWinnerModal(item?.winner_id)
                              }
                            >
                              Show winner
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() =>
                                navigate(
                                  `/join-room-auction/${item?.auction_id?._id}`
                                )
                              }
                            >
                              Show history auction
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {orderMember?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatCurrencyVND(item.price)}</td>
                          <td>You are winner</td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() =>
                                navigate(
                                  `/join-room-auction/${item?.auction_id}`
                                )
                              }
                            >
                              Show history auction
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </Table>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Modal show={showWinnerModal} onHide={handleCloseWinnerModal}>
        <Modal.Header closeButton>
          <Modal.Title>Winner Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>User: {winnerInfo?.username}</p>
          <p>Phone: {formatCurrencyVND(winnerInfo?.phone)}</p>
          <p>Address: {formatCurrencyVND(winnerInfo?.address)}</p>
          <p>Email: {formatCurrencyVND(winnerInfo?.email)}</p>
          {/* Add other winner information here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWinnerModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default HistoryTransaction;
