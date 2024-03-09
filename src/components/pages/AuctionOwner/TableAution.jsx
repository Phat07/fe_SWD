import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types"; // Import PropTypes
import { format } from "date-fns";

const TableAution = ({ data = [], onUpdate, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
  return (
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
            <th>Regitration</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_id.name}</td>
              <td>
                {formatDate(item?.regitration_start_time)} -{" "}
                {formatDate(item?.regitration_end_time)}
              </td>
              <td>{formatDate(item?.start_time)}</td>
              <td>{formatDate(item?.end_time)}</td>
              <td>
                <Badge bg="danger">{item.status}</Badge>
              </td>
              <td>
                {onUpdate && (
                  <Button variant="success" onClick={() => onUpdate(item)}>
                    Detail
                  </Button>
                )}{" "}
                {onDelete && (
                  <Button variant="danger" onClick={() => onDelete(item)}>
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
};

TableAution.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string, // Assuming status is part of the data object
    })
  ),
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TableAution;
