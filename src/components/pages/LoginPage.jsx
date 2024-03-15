import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserServices } from "../../services/userServices";
import { actUserLogin } from "../../store/user/action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    // rememberMe: false,
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.USER.currentUser);
  console.log("user", user);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    UserServices.loginUser(formData)
      .then((resFetchMe) => {
        console.log("resFetchMe", resFetchMe);
        const token = resFetchMe.data.token;
        const currentUser = resFetchMe.data.user;
        const role = resFetchMe.data.user.title;
        UserServices.fetchMe(token)
          .then((res) => {
            dispatch(actUserLogin(currentUser, token, role));
            toast.success(`Chào mừng đã vào cổng`);
            navigate("/");
          })
          .catch((err) => alert("Login or password failed"));
      })
      .catch((error) => {
        console.log("aaaaa");
        console.log("error", error);
        if (error) {
          alert(error?.response?.data?.message)
          // toast.error(error?.response?.data?.message);
        }
        // if (error) {
        //   toast.error("Server error:", error.response.data);
        // } else if (error.request) {
        //   toast.error("Network error:", error.request);
        // } else {
        //   console.log("error", error);
        //   toast.error("Error:", error);
        // }
      });
  };

  return (
    <Container fluid>
      {/* <ToastContainer position="top-right" autoClose={2000} /> */}
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {/* Phần hình ảnh */}
        <Col md={6}>
          <img
            src={"../../../public/assets/images/login/login1.jpg"}
            alt="Login"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        {/* Phần form đăng nhập */}
        <Col md={6}>
          <div className="p-4">
            <h2 className="mb-4">Login to orchid auction </h2>
            <p>
              Do not have an account?{" "}
              <Link
                to={"/signup"}
                style={{
                  textDecoration: "none",
                  border: "1px solid #007BFF",
                  borderRadius: "10px",
                }}
              >
                Create an account here
              </Link>
            </p>
            <p
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                textCombineUpright: "all",
                fontWeight: "900",
              }}
            >
              Or
            </p>
            <Form onSubmit={handleSubmit}>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    style={{ width: "500px" }}
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={{ width: "500px" }}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
              </Form.Group> */}

              <Button
                variant="primary"
                type="submit"
                style={{ width: "500px", marginTop: "20px" }}
              >
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
