// Import thêm useState từ React
import React, { useState } from "react";
import { Form, Button, Modal, Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import { FiMail, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi"; // Import FiEye và FiEyeOff
import { RiUserAddLine } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import "../../css/signUp.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    avatar: [],
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để điều khiển hiển thị/masquerade password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (!passwordMatch) {
      alert("Password and Confirm Password do not match");
    } else {
      setShowOTPModal(true);
    }

    setValidated(true);
  };

  const handleOTPVerification = () => {
    setEmailVerified(true);
    setShowOTPModal(false);
    document.getElementById("signUpButton").style.backgroundColor = "#007bff";
    document.getElementById("signUpButton").style.color = "#fff";
  };

  const handleEmailVerification = () => {
    setShowOTPModal(true);
  };

  const handleRemoveAvatar = (index) => {
    const newAvatars = [...formData.avatar];
    newAvatars.splice(index, 1);
    setFormData({ ...formData, avatar: newAvatars });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        avatar: [...formData.avatar, ...acceptedFiles],
      });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đảo ngược trạng thái hiển thị/masquerade password
  };

  return (
    <>
      {/* <Header /> */}
      <Container className="mt-5">
        <Row className="justify-content-center text-center">
          <Col xs={12} md={8}>
            <h2>Register an account</h2>
            <p>
              Do you already have an account ?{" "}
              <Link to={"/login"}>Go to Login</Link>
            </p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <div className="p-4 border rounded">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a username.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginRight: "10px" }}
                    disabled={emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  className="verify-email-button"
                  variant="primary"
                  onClick={handleEmailVerification}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#fff",
                    color: "#007bff",
                    border: "solid #007bff 1px",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "block",
                    width: "100%",
                    position: "relative",
                    fontWeight: "500",
                  }}
                  disabled={emailVerified}
                >
                  Verify Email{" "}
                  <FiMail
                    style={{
                      fontSize: "20",
                      position: "absolute",
                      top: "12px",
                      marginLeft: "5px",
                    }}
                  />
                </Button>

                <Row className="align-items-center">
                  <Col xs={10}>
                    <Form.Group controlId="password" className="mb-0">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={!emailVerified}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col
                    xs={2}
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

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!passwordMatch}
                    disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="avatar">
                  <Form.Label>Avatar</Form.Label>
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <div className="dropzone-content">
                      {formData.avatar.map((avatar, index) => (
                        <div key={index} className="avatar-wrapper">
                          <img
                            src={URL.createObjectURL(avatar)}
                            alt="Avatar"
                            className="avatar-preview"
                          />
                          <div className="button-wrapper">
                            <button
                              type="button"
                              onClick={() => handleRemoveAvatar(index)}
                              className="btn-remove-avatar"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                      {formData.avatar.length === 0 && (
                        <>
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                          <Button variant="primary" className="btn-upload">
                            {" "}
                            {/* Disable if email is not verified */}
                            Upload Image
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please upload your avatar.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="text-center">
                  <Button
                    id="signUpButton"
                    variant="primary"
                    type="submit"
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#E5E8EB",
                      color: "#A2ACB8",
                      border: "none",
                    }}
                    disabled={!emailVerified}
                  >
                    Sign Up <FontAwesomeIcon icon={faUserPlus} />
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showOTPModal} onHide={() => setShowOTPModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Email Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            An OTP has been sent to your email. Please verify your email
            address.
          </p>
          {/* Your OTP verification input and logic can be implemented here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOTPModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOTPVerification}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Footer /> */}
    </>
  );
};

export default SignUpPage;
