// Import thêm useState từ React
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FiEye, FiEyeOff, FiMail, FiTrash2 } from "react-icons/fi"; // Import FiEye và FiEyeOff
import { Link, useNavigate } from "react-router-dom";
import "../../css/signUp.css";
import * as faceapi from "face-api.js";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import { load } from "@tensorflow-models/blazeface";
import { useDispatch, useSelector } from "react-redux";
import { actAllRoleGetAsync, actPostUserAsync } from "../../store/user/action";
import { FaMale, FaFemale } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    image: "",
    role_id: "",
    gender: "",
  });
  const role = useSelector((state) => state.USER.roles);
  console.log("role", role);
  useEffect(() => {
    dispatch(actAllRoleGetAsync());
  }, []);

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
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("form", formData);
    if (name === "image") {
      setFormData({
        ...formData,
        image: [...formData.image, ...files],
      });
    } else if (name === "role") {
      setFormData({
        ...formData,
        role_id: value,
      });
      // setRole(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
  };
  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // Nếu form không hợp lệ, cập nhật validated state và ngăn chặn submit
      setValidated(true);
      return;
    }
    // const base64Image = await convertToBase64(formData?.image);
    // let data = {
    //   username: formData?.username,
    //   fullName: formData?.fullName,
    //   email: formData?.email,
    //   password: formData?.password,
    //   address: formData?.address,
    //   phone: formData?.phone,
    //   image: base64Image,
    //   role_id: formData?.role_id,
    //   gender: formData?.gender,
    // };
    const formData1 = new FormData();
    formData1.append("image", formData?.image); // Giữ nguyên file hình ảnh
    formData1.append("username", formData?.username);
    formData1.append("fullName", formData?.fullName);
    formData1.append("email", formData?.email);
    formData1.append("password", formData?.password);
    formData1.append("address", formData?.address);
    formData1.append("phone", formData?.phone);
    formData1.append("role_id", formData?.role_id);
    formData1.append("gender", formData?.gender);
    dispatch(actPostUserAsync(formData1));
    navigate("/login");
  };

  const handleRemoveAvatar = (index) => {
    const newAvatars = [...formData.image];
    newAvatars.splice(index, 1);
    setFormData({ ...formData, image: newAvatars });
  };

  // const {
  //   getRootProps: getAvatarRootProps,
  //   getInputProps: getAvatarInputProps,
  // } = useDropzone({
  //   accept: "image/*",
  //   onDrop: (acceptedFiles) => {
  //     setFormData({
  //       ...formData,
  //       image: [...formData.image, ...acceptedFiles],
  //     });
  //   },
  // });

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFormData({
          ...formData,
          image: acceptedFiles[0], 
        });
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đảo ngược trạng thái hiển thị/masquerade password
  };
  const handleGenderSelect = (selectedGender) => {
    setFormData({ ...formData, gender: selectedGender });
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
                    // disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="fullName">
                  <Form.Label>FullName</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    // disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a fullName.
                  </Form.Control.Feedback>
                </Form.Group>
                {/* tạo một select option chọn gender giúp tui gồm male và female */}
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <div className="gender-icons">
                    <div
                      className={`gender-icon ${
                        formData.gender === "male" ? "selected" : ""
                      }`}
                      onClick={() => handleGenderSelect("male")}
                    >
                      <FaMale />
                      <span className="gender-label">Male</span>
                    </div>
                    <div
                      className={`gender-icon ${
                        formData.gender === "female" ? "selected" : ""
                      }`}
                      onClick={() => handleGenderSelect("female")}
                    >
                      <FaFemale />
                      <span className="gender-label">Female</span>
                    </div>
                    <div
                      className={`gender-icon ${
                        formData.gender === "other" ? "selected" : ""
                      }`}
                      onClick={() => handleGenderSelect("other")}
                    >
                      <BsFillPersonFill />
                      <span className="gender-label">Other</span>
                    </div>
                  </div>
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
                    // disabled={emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

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
                        // disabled={!emailVerified}
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
                    // disabled={!emailVerified}
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
                    value={formData?.role_id}
                    onChange={handleChange}
                    // disabled={!emailVerified}
                  >
                    <option value="">Select Role</option>
                    {role.map((roleOption) => (
                      <option key={roleOption.value} value={roleOption._id}>
                        {roleOption.title}
                      </option>
                    ))}
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
                    // disabled={!emailVerified}
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
                    // disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Avatar</Form.Label>
                  <div {...getAvatarRootProps()} className="dropzone">
                    <input {...getAvatarInputProps()} />
                    <div className="dropzone-content">
                      {/* {formData.image.map((image, index) => (
                        <div key={index} className="avatar-wrapper">
                          <img
                            src={URL.createObjectURL(image)}
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
                      ))} */}
                      {formData.image && (
                        <div>
                          <img
                            src={URL.createObjectURL(formData?.image)}
                            alt="Uploaded"
                          />
                        </div>
                      )}
                      {formData.image === "" && (
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
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Sign Up <FontAwesomeIcon icon={faUserPlus} />
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUpPage;
