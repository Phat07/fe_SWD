import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Form, Row } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Profile(props) {
  const [status, setStatus] = useState(1);
  const [choice, setChoice] = useState(1);

  // -------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để điều khiển hiển thị/masquerade password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đảo ngược trạng thái hiển thị/masquerade password
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Đảo ngược trạng thái hiển thị/masquerade password
  };
  // -------------------------------------------------------
  const [viewMode, setViewMode] = useState("mode1");
  const auctions = [
    {
      id: 1,
      title: "Card 1",
      content: "Content of card 1",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 2,
      title: "Card 2",
      content: "Content of card 2",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 3,
      title: "Card 3",
      content: "Content of card 3",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 4,
      title: "Card 4",
      content: "Content of card 4",
      image: "../../../public/assets/images/background/background3.jpg",
    },
    {
      id: 5,
      title: "Card 5",
      content: "Content of card 5",
      image: "../../../public/assets/images/background/background3.jpg",
    },
  ];
  // -------------------------------------------------------
  const usersData = [
    {
      id: 1,
      guest: "Samppa Nori",
      owner: "Estavan Lykos",
      flower: "Phong Lan very gut",
      date: "2022/01/01",
      status: "Active",
    },
    {
      id: 2,
      guest: "Samppa Nori",
      owner: "Estavan Lykos",
      flower: "Phong Lan very gut",
      date: "2022/01/01",
      status: "Active",
    },
    {
      id: 3,
      guest: "Samppa Nori",
      owner: "Estavan Lykos",
      flower: "Phong Lan very gut",
      date: "2022/01/01",
      status: "Active",
    },
    {
      id: 4,
      guest: "Samppa Nori",
      owner: "Estavan Lykos",
      flower: "Phong Lan very gut",
      date: "2022/01/01",
      status: "Active",
    },
    {
      id: 5,
      guest: "Samppa Nori",
      owner: "Estavan Lykos",
      flower: "Phong Lan very gut",
      date: "2022/01/01",
      status: "Active",
    },
    {
      id: 6,
      guest: "Samppa Nori",
      owner: "Estavan Lykos",
      flower: "Phong Lan very gut",
      date: "2022/01/01",
      status: "Active",
    },
    {
      id: 7,
      guest: "Samppa Nori",
      owner: "Estavan Lykos",
      flower: "Phong Lan very gut",
      date: "2022/01/01",
      status: "Active",
    },
  ];
  // -------------------------------------------------------
  return (
    <div>
      <div className="container">
        <div className="row high-padding">
          <div className="col-lg-3 col-md-4">
            <ButtonGroup vertical>
              <Button variant="primary" onClick={() => setStatus(1)}>
                Thông tin tài khoản
              </Button>

              <Button variant="primary" onClick={() => setStatus(2)}>
                Giỏ hàng
              </Button>

              <Button variant="primary" onClick={() => setStatus(3)}>
                Hoa lan chờ đấu giá
              </Button>

              <Button variant="primary" onClick={() => setStatus(4)}>
                Lịch sử đấu giá
              </Button>

              <Button variant="primary" onClick={() => setStatus(5)}>
                Tài liệu
              </Button>
            </ButtonGroup>
          </div>

          <div className="col-lg-9 col-md-8">
            {status === 1 ? (
              <div>
                <Row>
                  <Col xs={12} md={8}>
                    <div className="p-4 border rounded">
                      <Form>
                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control required type="email" name="email" />
                        </Form.Group>

                        <Form.Group controlId="username">
                          <Form.Label>Username</Form.Label>
                          <Form.Control required type="text" name="username" />
                        </Form.Group>

                        <Row className="align-items-center">
                          <Col xs={11}>
                            <Form.Group controlId="password" className="mb-0">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                              />
                            </Form.Group>
                          </Col>
                          <Col
                            xs={1}
                            style={{ marginTop: "30px" }}
                            className="d-flex justify-content-start"
                          >
                            <Button
                              style={{ borderRadius: "20px" }}
                              variant="outline-secondary"
                              className="password-toggle-button"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <FiEyeOff /> : <FiEye />}
                            </Button>
                          </Col>
                        </Row>

                        <Row className="align-items-center">
                          <Col xs={11}>
                            <Form.Group
                              controlId="confirmPassword"
                              className="mb-0"
                            >
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control
                                type={showConfirmPassword ? "text" : "Password"}
                                name="confirmPassword"
                              />
                            </Form.Group>
                          </Col>
                          <Col
                            xs={1}
                            style={{ marginTop: "30px" }}
                            className="d-flex justify-content-start"
                          >
                            <Button
                              style={{ borderRadius: "20px" }}
                              variant="outline-secondary"
                              className="confirm-password-toggle-button"
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </Button>
                          </Col>
                        </Row>

                        <Form.Group controlId="address">
                          <Form.Label>Address</Form.Label>
                          <Form.Control type="text" name="address" />
                        </Form.Group>

                        <Form.Group controlId="phone">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="tel" name="phone" />
                        </Form.Group>

                        <div className="text-center">
                          <Button
                            id="signUpButton"
                            variant="primary"
                            type="submit"
                            style={{
                              marginTop: "20px",
                            }}
                          >
                            Upload
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              ""
            )}

            {status === 2 ? (
              <div>
                <div>
                  <ButtonGroup>
                    <Button variant="primary" onClick={() => setChoice(1)}>
                      Chưa thanh toán
                    </Button>

                    <Button variant="primary" onClick={() => setChoice(2)}>
                      Đã thanh toán
                    </Button>

                    <Button variant="primary" onClick={() => setChoice(3)}>
                      Hoàn tiền
                    </Button>
                  </ButtonGroup>
                </div>
                <div>
                  {choice === 1 ? <div>thay đổi 1</div> : ""}
                  {choice === 2 ? <div>thay đổi 2</div> : ""}
                  {choice === 3 ? <div>thay đổi 3</div> : ""}
                </div>
              </div>
            ) : (
              ""
            )}

            {status === 3 ? (
              <div className={`row gy-4 mb-60 d-flex list-item `}>
                {/* Hiển thị danh sách sản phẩm */}
                {auctions.map((card) => (
                  <div
                    key={card.id}
                    className={` ${
                      viewMode === "mode2" ? "col-lg-3" : "col-lg-3"
                    }`}
                  >
                    <Card
                      style={{
                        width: `${viewMode === "mode2" ? "800px" : ""}`,
                      }}
                    >
                      <div
                        style={{
                          display: `${viewMode === "mode2" ? "flex" : ""}`,
                        }}
                      >
                        <div>
                          <Card.Img
                            variant="top"
                            src={card.image}
                            style={{
                              width: `${viewMode === "mode2" ? "200px" : ""}`,
                            }}
                          />
                        </div>
                        <div>
                          <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.content}</Card.Text>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            {status === 4 ? <div>thay đổi 4</div> : ""}
            {status === 5 ? (
              <div>
                <Card>
                  <Card.Header>Quote</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>
                        {" "}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.{" "}
                      </p>
                      <footer className="blockquote-footer">
                        Someone famous in{" "}
                        <cite title="Source Title">Source Title</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
