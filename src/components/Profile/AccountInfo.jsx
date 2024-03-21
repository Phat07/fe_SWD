import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { actGetWalletByUserAsync } from "../../store/wallet/action";

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
    Moneywallet: "200",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const token = localStorage.getItem("ACCESS_TOKEN");
  const userInfor = useSelector((state) => state.USER.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetWalletByUserAsync(userInfor?._id, token));
  }, [userInfor]);
  const cart = useSelector((state) => state.WALLET.wallet);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = () => {
    // Gửi thông tin cập nhật tới API hoặc xử lý thông tin cập nhật ở đây
  };
  function formatCurrencyVND(amount) {
    // Sử dụng hàm toLocaleString() để định dạng số
    // Cài đặt style là 'currency' và currency là 'VND'
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <Container>
      <Row className="mb-3">
        {/* Card bên phải */}
        <Col md={4}>
          <Card>
            <div className="d-flex justify-content-center">
              <Card.Img
                variant="center"
                src={userInfor?.image}
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
                  // onChange={(e) =>
                  //   setUser({
                  //     ...user,
                  //     avatar: URL.createObjectURL(e.target.files[0]),
                  //   })
                  // }
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
                <strong>Tên đăng nhập:</strong> {userInfor?.username}
              </Card.Text>
              <Card.Text>
                <strong>Họ và Tên:</strong> {userInfor?.fullName}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {userInfor?.email}
              </Card.Text>
              <Card.Text>
                <strong>Địa chỉ:</strong> {userInfor?.address}
              </Card.Text>
              <Card.Text>
                <strong>Số điện thoại:</strong> {userInfor?.phone}
              </Card.Text>
              <Card.Text>
                <strong>Tiền trong ví:</strong>{" "}
                {formatCurrencyVND(cart?.balance)}
              </Card.Text>

              {/* Các trường thông tin khác */}
              {/* <Form>
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
              </Form> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountInfo;
