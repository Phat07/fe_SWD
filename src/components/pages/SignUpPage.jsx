// Import thêm useState từ React
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FiEye, FiEyeOff, FiMail, FiTrash2 } from "react-icons/fi"; // Import FiEye và FiEyeOff
import { Link } from "react-router-dom";
import "../../css/signUp.css";
import * as faceapi from "face-api.js";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import { load } from "@tensorflow-models/blazeface";

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
    role: "", // Thêm trường cho trường chọn select
    frontIdImage: [], // Thêm trường cho ảnh mặt trước căn cước công dân
    backIdImage: [], // Thêm trường cho ảnh mặt sau căn cước công dân
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để điều khiển hiển thị/masquerade password

  const [otp, setOtp] = useState("");
  console.log("otp", otp);
  // kiểm tra email trước khi truyền lên be
  const [statusEmail, setStatusEmail] = useState("");

  const validateEmail = (email) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });

  //   if (name === "confirmPassword") {
  //     setPasswordMatch(value === formData.password);
  //   }
  // };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("form", formData);
    if (name === "avatar") {
      setFormData({
        ...formData,
        avatar: [...formData.avatar, ...files],
      });
    } else if (name === "role") {
      setFormData({
        ...formData,
        role: value,
      });
      // setRole(value);
    } else if (name === "frontIdImage") {
      setFormData({
        ...formData,
        frontIdImage: [...formData.avatar, ...files],
      });
      // setFrontIdImage(files[0]);
    } else if (name === "backIdImage") {
      setFormData({
        ...formData,
        backIdImage: [...formData.avatar, ...files],
      });
      // setBackIdImage(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = formData?.frontIdImage[0];

    // Kiểm tra xem image có tồn tại không
    if (!image) {
      console.error("Không tìm thấy hình ảnh");
      return;
    }

    // Tải mô hình Blazeface
    const model = await blazeface.load();

    // Tải hình ảnh và nhận diện khuôn mặt
    const img = document.createElement("img");
    img.src = URL.createObjectURL(image);
    img.onload = async () => {
      console.log("test00");
      const predictions = await model.estimateFaces(img);

      // Kiểm tra xem có khuôn mặt trong hình ảnh không
      if (predictions.length === 0) {
        console.error("Trong hình ảnh không có mặt người");
        // Thực hiện các hành động xử lý khi không có mặt người trong hình ảnh
      } else {
        // Có mặt người trong hình ảnh, thực hiện các hành động tiếp theo
        // Ví dụ: gửi hình ảnh lên server, hoặc thực hiện các xử lý khác
      }
    };
  };
// xử lý email không hợp lệ thì sẽ thông báo lỗi ra và không cho thực hiện bước tiếp theo
  const handleOTPVerification = () => {
    setEmailVerified(true);
    setShowOTPModal(false);
    document.getElementById("signUpButton").style.backgroundColor = "#007bff";
    document.getElementById("signUpButton").style.color = "#fff";
  };

  const handleEmailVerification = () => {
    if (validateEmail(formData?.email) === false) {
      console.log("aaaa");
      setStatusEmail(false);
      setShowOTPModal(true);
    } else if (validateEmail(formData?.email) === true) {
      setStatusEmail(true);
      setShowOTPModal(true);
    }
    console.log("bbb", validateEmail(formData?.email));
  };

  const handleRemoveAvatar = (index) => {
    const newAvatars = [...formData.avatar];
    newAvatars.splice(index, 1);
    setFormData({ ...formData, avatar: newAvatars });
  };
  const handleRemoveFrontIdImage = (index) => {
    setFormData((prevFormData) => {
      const newFrontIdImageList = [...prevFormData.frontIdImage];
      newFrontIdImageList.splice(index, 1);
      return {
        ...prevFormData,
        frontIdImage: newFrontIdImageList,
      };
    });
  };

  // Hàm xóa hình ảnh khỏi danh sách backIdImage
  const handleRemoveBackIdImage = (index) => {
    setFormData((prevFormData) => {
      const newBackIdImageList = [...prevFormData.backIdImage];
      newBackIdImageList.splice(index, 1);
      return {
        ...prevFormData,
        backIdImage: newBackIdImageList,
      };
    });
  };
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/*",
  //   onDrop: (acceptedFiles) => {
  //     setFormData({
  //       ...formData,
  //       avatar: [...formData.avatar, ...acceptedFiles],
  //     });
  //   },
  // });
  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        avatar: [...formData.avatar, ...acceptedFiles],
      });
    },
  });

  const {
    getRootProps: getFrontIdRootProps,
    getInputProps: getFrontIdInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        frontIdImage: [...formData.frontIdImage, ...acceptedFiles],
      });
    },
  });

  const {
    getRootProps: getBackIdRootProps,
    getInputProps: getBackIdInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        backIdImage: [...formData.backIdImage, ...acceptedFiles],
      });
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đảo ngược trạng thái hiển thị/masquerade password
  };
  console.log("test", formData);
  return (
    <>
      {/* <Header /> */}
      <Container className="mt-5">
        <Row className="justify-content-center text-center">
          <Col xs={12} md={8}>
            <h2>Register an account</h2>
            <p>
              Do you already have an account ?{" "}
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  border: "1px solid #007BFF",
                  borderRadius: "10px",
                }}
              >
                Go to Login
              </Link>
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

                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    name="role"
                    value={formData?.role}
                    onChange={handleChange}
                    disabled={!emailVerified}
                  >
                    <option value="">Select Role</option>
                    <option value="customer">Customer</option>
                    <option value="productOwner">Product Owner</option>
                  </Form.Control>
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
                  <div {...getAvatarRootProps()} className="dropzone">
                    <input {...getAvatarInputProps()} />
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
                </Form.Group>

                <Form.Group controlId="frontIdImage">
                  <Form.Label>
                    The front of the citizen identification card
                  </Form.Label>
                  <div {...getFrontIdRootProps()} className="dropzone">
                    <input {...getFrontIdInputProps()} />
                    <div className="dropzone-content">
                      {formData.frontIdImage.map((image, index) => (
                        <div key={index} className="avatar-wrapper">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Front ID Image"
                            className="avatar-preview"
                          />
                          <div className="button-wrapper">
                            <button
                              type="button"
                              onClick={() => handleRemoveFrontIdImage(index)}
                              className="btn-remove-avatar"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                      {formData.frontIdImage.length === 0 && (
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
                </Form.Group>

                <Form.Group controlId="backIdImage">
                  <Form.Label>Back of citizen identification card</Form.Label>
                  <div {...getBackIdRootProps()} className="dropzone">
                    <input {...getBackIdInputProps()} />
                    <div className="dropzone-content">
                      {formData.backIdImage.map((image, index) => (
                        <div key={index} className="avatar-wrapper">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Back ID Image"
                            className="avatar-preview"
                          />
                          <div className="button-wrapper">
                            <button
                              type="button"
                              onClick={() => handleRemoveBackIdImage(index)}
                              className="btn-remove-avatar"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                      {formData.backIdImage.length === 0 && (
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
          {statusEmail === false ? (
            <p>Email invalidate</p>
          ) : (
            <p>
              An OTP has been sent to your email. Please verify your email
              address.
              <br />
              <input
                className="otp"
                placeholder="Nhập OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </p>
          )}

          {/* Your OTP verification input and logic can be implemented here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOTPModal(false)}>
            Cancel
          </Button>
          {statusEmail === false ? (
            <></>
          ) : (
            <Button variant="primary" onClick={handleOTPVerification}>
              Verify
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* <Footer /> */}
    </>
  );
};

export default SignUpPage;
