import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Form, Badge, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actRequestGetByUserIdAsync } from "../../store/request/action";
import { format } from "date-fns";

const ReportRequest = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
  const allRequestId = useSelector((state) => state.REQUEST.allRequestId);
  console.log("allRequestId: ", allRequestId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actRequestGetByUserIdAsync(user?._id, token));
  }, [dispatch, token, user]);
  return (
    <Row>
      <Col xs={12}>
        <Card className="mb-4">
          <Card.Header>
            <strong>Request</strong>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs="auto">
                {" "}
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Money</th>
                    <th>Date Send</th>
                    <th>Date Confirm</th>
                    <th>Note</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allRequestId?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.user_id?.fullName}</td>
                      <td>{item.description}</td>
                      <td>{formatDate(item?.create_timestamp)}</td>
                      <td>{formatDate(item?.update_timestamp)}</td>
                      <td> {item.note}</td>
                      <td>
                        {" "}
                        {item.status === true ? (
                          <Badge bg="warning">chưa xử lý</Badge>
                        ) : (
                          <Badge bg="success">đã xử lý</Badge>
                        )}
                      </td>
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

export default ReportRequest;
