import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actOrderGetAsync } from "../../store/order/action";
import { useNavigate } from "react-router-dom";

const HistoryTransaction = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const user = useSelector((state) => state.USER.currentUser);
  const navigate = useNavigate();
  const orders = useSelector((state) => state.ORDER.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actOrderGetAsync(token));
  }, []);

  const host = orders?.filter((e) => e?.auction_id?.host_id?._id === user?._id);
  const winner = orders?.filter((e) => e?.winner_id?._id === user?._id);
  console.log("host",host);
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

  const handleCloseWinnerModal = () => {
    setShowWinnerModal(false);
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
                      {host.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatCurrencyVND(item.price)}</td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() => handleOpenWinnerModal(item?.winner_id)}
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
                      {winner.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{formatCurrencyVND(item.money)}</td>
                          <td>You are winner</td>
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
