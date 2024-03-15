import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types"; // Import PropTypes
import Countdown from "react-countdown";
import { FaAlignRight, FaAngleDoubleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TableAutionWating = ({ data = [], onUpdate, onDelete }) => {
  const navigate = useNavigate();
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
            <th>Time</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                {/* {index + 1}.{" "} */}
                {item?.status === "not yet auctioned" ? (
                  <Countdown
                    date={new Date(item?.regitration_end_time).getTime()}
                    // startDate={new Date()}
                    // endDate={new Date(item?.regitration_end_time)}
                    renderer={({
                      days,
                      hours,
                      minutes,
                      seconds,
                      completed,
                    }) => {
                      if (completed) {
                        return "Expired";
                      } else {
                        return (
                          <>
                            {days} days {hours} hours {minutes} minutes{" "}
                            {seconds} seconds{" "}
                            <FaAngleDoubleRight style={{ color: "blue" }} /> kết
                            thúc đăng ký
                          </>
                        );
                      }
                    }}
                  />
                ) : item.status === "about to auction" ? (
                  <Countdown
                    date={new Date(item?.start_time).getTime()}
                    // startDate={new Date(item?.regitration_end_time)}
                    // endDate={new Date(item?.start_time)}
                    renderer={({
                      days,
                      hours,
                      minutes,
                      seconds,
                      completed,
                    }) => {
                      if (completed) {
                        return "Expired";
                      } else {
                        return (
                          <>
                            {days} days {hours} hours {minutes} minutes{" "}
                            {seconds} seconds{" "}
                            <FaAngleDoubleRight style={{ color: "blue" }} /> bắt
                            đầu đấu giá
                          </>
                        );
                      }
                    }}
                  />
                ) : (
                  <Countdown
                    date={new Date(item?.end_time).getTime()}
                    // startDate={new Date(item?.regitration_end_time)}
                    // endDate={new Date(item?.start_time)}
                    renderer={({
                      days,
                      hours,
                      minutes,
                      seconds,
                      completed,
                    }) => {
                      if (completed) {
                        return "Expired";
                      } else {
                        return (
                          <>
                            {days} days {hours} hours {minutes} minutes{" "}
                            {seconds} seconds{" "}
                            <FaAngleDoubleRight style={{ color: "blue" }} /> kết thúc đấu giá
                          </>
                        );
                      }
                    }}
                  />
                )}
              </td>

              <td>{item?.product?.name}</td>
              <td>
                {item.status === "about to auction" ? (
                  <Badge bg="warning">Sắp diễn ra</Badge>
                ) : item.status === "not yet auctioned" ? (
                  <Badge bg="secondary">Chưa diễn ra</Badge>
                ) : (
                  <Badge bg="success">Đang diễn ra</Badge> // Thay "Trạng thái khác" bằng trạng thái thực tế
                )}
              </td>
              <td>
                {onUpdate && (
                  <Button variant="success" onClick={() => onUpdate(item?.auction_id)}>
                    Detail
                  </Button>
                )}{" "}
                {item?.status === "auctioning" ? (
                  <Button
                    variant="success"
                    onClick={() =>
                      navigate(`/join-room-auction/${item?.auction_id}`)
                    }
                  >
                    Join the room
                  </Button>
                ) : (
                  <></>
                )}
                {/* {onDelete && (
                  <Button variant="danger" onClick={() => onDelete(item)}>
                    Cancel registration
                  </Button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
};

TableAutionWating.propTypes = {
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

export default TableAutionWating;
