import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Container fluid>
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
            <Form>
              {/* <Row> */}
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    placeholder="Enter username"
                    style={{ width: "500px" }}
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
                  />
                </Form.Group>
              </Col>
              {/* </Row> */}

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ width: "500px" }}
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
