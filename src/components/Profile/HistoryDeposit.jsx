import React from "react";
import { Card, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const HistoryDeposit = () => {
  const data = [
    { id: 1, money: 20000, send: "2023-03-20", accept: "2023-03-21" },
    { id: 2, money: 10000, send: "2023-03-25", accept: "2023-03-25" },
    // Thêm dữ liệu mẫu khác tại đây
  ];
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  function formatCurrencyVND(amount) {
    // Sử dụng hàm toLocaleString() để định dạng số
    // Cài đặt style là 'currency' và currency là 'VND'
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const historyMoney = useSelector((state) => state.WALLET.walletHistory);

  const sortedHistory = historyMoney.slice().sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  return (
    <Row>
      <Col xs={12}>
        <Card className="mb-4">
          <Card.Header>
            <strong>Lịch sử nạp tiền</strong>
          </Card.Header>
          <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Row>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Index</th>
                    {/* <th>Type</th> */}
                    <th>Money</th>
                    <th>Date Accept</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHistory?.map((item, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      {/* <td style={{color:`${item?.type==="deposit"?"green":"red"}`}}>{item?.type}</td> */}
                      <td
                        style={{
                          color: `${
                            item?.type === "deposit" ? "green" : "red"
                          }`,
                        }}
                      >
                        {item?.type === "deposit" ? "+" : "-"}
                        {formatCurrencyVND(item?.amount)}
                      </td>
                      <td>{formatDate(item?.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default HistoryDeposit;
