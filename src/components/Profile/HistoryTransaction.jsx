import React from "react";
import { Card, Row, Col, Button, Form, Table } from "react-bootstrap";

const HistoryTransaction = () => {
  const data = [
    { id: 1, money: 20000, send: "2023-03-20", accept: "2023-03-21" },
    { id: 2, money: 10000, send: "2023-03-25", accept: "2023-03-25" },
    // Thêm dữ liệu mẫu khác tại đây
  ];
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Row>
      <Col xs={12}>
        <Card className="mb-4">
          <Card.Header>
            <strong>Lịch sử giao dịch</strong>
          </Card.Header>
          <Card.Body>
            <Row>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Money</th>
                    <th>Date Send Request</th>
                    <th>Date Accept</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.money}</td>
                      <td>{formatDate(item.send)}</td>
                      <td>{formatDate(item.accept)}</td>
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

export default HistoryTransaction;
