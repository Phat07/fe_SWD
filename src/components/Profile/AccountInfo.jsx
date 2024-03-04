import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AccountInfo = () => {
  // Giả sử đây là thông tin người dùng lấy từ API hoặc State Management
  const [user, setUser] = useState({
    avatar:
      "https://cloudfront-us-east-1.images.arcpublishing.com/gray/OKL3YQRDPRGRDKEM46PFW67ZMQ.jpg",
    userName: "User01",
    email: "user01@example.com",
    fullName: "John Doe",
    address: "123 Main Street, Anytown, USA",
    phoneNumber: "+123456789",
    password: "123456789",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = () => {
    // Gửi thông tin cập nhật tới API hoặc xử lý thông tin cập nhật ở đây
    console.log("Updated user info", user);
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        {/* Card bên phải */}
        <Col md={4}>
          <Card>
            <div className="d-flex justify-content-center">
              <Card.Img
                variant="center"
                src={user.avatar}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                className="mt-3"
              />
            </div>
            <Card.Body>
              <Form.Group
                controlId="formFile"
                className="mb-2 d-flex align-items-center"
              >
                <Form.Label className="mb-0 me-3">Avatar</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      avatar: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {/* Card bên trái */}
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Thông Tin Cá Nhân</Card.Title>
              <Card.Text>
                <strong>Tên đăng nhập:</strong> {user.userName}
              </Card.Text>
              <Card.Text>
                <strong>Họ và Tên:</strong> {user.fullName}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
              <Card.Text>
                <strong>Địa chỉ:</strong> {user.address}
              </Card.Text>
              <Card.Text>
                <strong>Số điện thoại:</strong> {user.phoneNumber}
              </Card.Text>

              {/* Các trường thông tin khác */}
              <Form>
                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  controlId="password"
                >
                  <Form.Label className="mb-0 me-3" style={{ width: "auto" }}>
                    <strong>Password:</strong>
                  </Form.Label>
                  <div className="password-toggle d-flex" style={{ flex: 1 }}>
                    <FormControl
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="me-2"
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountInfo;
