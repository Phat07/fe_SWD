import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types"; // Import PropTypes
import { format } from "date-fns";
import { Card, Carousel } from "react-bootstrap";
import Countdown from "react-countdown";

const TableAutionUser = ({ data = [], onUpdate, onDelete }) => {
  const auctionRegisEndTime = new Date(data?.regitration_end_time).getTime();
  const [searchTerm, setSearchTerm] = useState("");
  const currentTime = new Date().getTime();
  const timeDiff = auctionRegisEndTime - currentTime;
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
  const filteredData = searchTerm
    ? data.filter((item) =>
        item.product_id.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;
  return (
    <Row>
      <Col xs="12">
        {" "}
        {/* Sử dụng xs="auto" để ô chỉ chiếm không gian cần thiết */}
        <Form className="d-flex mb-3" role="search">
          <Form.Control
            className="me-2"
            type="search"
            placeholder="Search Name Auction"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
      </Col>
      {filteredData?.map((item, index) => (
        <Col key={index} sm={12} md={4} className="mb-4">
          <Card>
            <Carousel>
              {item?.product_id?.image?.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${index + 1}`}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Title>{item?.product_id?.name}</Card.Title>
              <Card.Text>Người tổ chức: {item?.host_id?.fullName}</Card.Text>
              {item?.status === "not yet auctioned" ? (
                <Card.Text>Thời gian còn lại đến khi hết đăng kí</Card.Text>
              ) : item?.status === "not" ? (
                <Card.Text>Thời gian còn lại để mở đăng ký đấu giá</Card.Text>
              ) : (
                <Card.Text>Thời gian còn lại đến khi đấu giá</Card.Text>
              )}
              {item?.status === "not yet auctioned" ? (
                <Card.Text>
                  {/* <div className="timestamp-div"> */}
                  <div className="countdown-container">
                    <Countdown
                      date={new Date(item?.regitration_end_time)}
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
                              {/* <FaAngleDoubleRight style={{ color: "blue" }} />{" "}
                              kết thúc đấu giá */}
                            </>
                          );
                        }
                      }}
                    />
                  </div>
                  {/* </div> */}
                </Card.Text>
              ) : item?.status === "not" ? (
                <Card.Text>
                  {/* <div className="timestamp-div"> */}
                  <div className="countdown-container">
                    <Countdown
                      date={new Date(item?.regitration_start_time)}
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
                              {/* <FaAngleDoubleRight style={{ color: "blue" }} />{" "}
                              kết thúc đấu giá */}
                            </>
                          );
                        }
                      }}
                    />
                  </div>
                  {/* </div> */}
                </Card.Text>
              ) : (
                <Card.Text>Thời gian còn lại đến khi đấu giá</Card.Text>
              )}

              <Button variant="primary" onClick={() => onUpdate(item)}>
                Chi tiết
              </Button>
              {/* <Button variant="primary">Tham gia</Button> */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

TableAutionUser.propTypes = {
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

export default TableAutionUser;
