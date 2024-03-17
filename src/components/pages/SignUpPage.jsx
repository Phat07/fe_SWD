// Import thêm useState từ React
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { FiEye, FiEyeOff, FiMail, FiTrash2 } from "react-icons/fi"; // Import FiEye và FiEyeOff
import { Link, useNavigate } from "react-router-dom";
import "../../css/signUp.css";
import { useDispatch, useSelector } from "react-redux";
import { actAllRoleGetAsync, actPostUserAsync } from "../../store/user/action";
import { FaMale, FaFemale, FaSpinner } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";

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
  const rolePage = role?.filter((i) => i?.title !== "ADMIN");
  useEffect(() => {
    dispatch(actAllRoleGetAsync());
  }, []);

  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để điều khiển hiển thị/masquerade password
  const [isLoading, setIsLoading] = useState(false);
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
  const handleOTPVerification = () => {
    axios
      .post("http://localhost:3001/users/CheckOTP", {
        user_mail: formData.email,
        otp_code: otp, // Giả sử biến otpCode chứa mã OTP đã được tạo ra trước đó
      })
      .then((verifyResponse) => {
        setEmailVerified(true);
        setShowOTPModal(false);
        document.getElementById("signUpButton").style.backgroundColor =
          "#007bff";
        document.getElementById("signUpButton").style.color = "#fff";
        // Xử lý kết quả trả về từ việc xác minh OTP (nếu cần)
        alert("Chúc mừng bạn đã xác minh thành công.");
        console.log("Verify OTP response:", verifyResponse.data);
      })
      .catch((verifyError) => {
        // Xử lý lỗi nếu có khi xác minh OTP
        console.error("There was a problem verifying OTP:", verifyError);
        alert("Có lỗi xảy ra khi xác minh mã OTP.");
      });
  };

  const handleEmailVerification = () => {
    const isEmailValid = validateEmail(formData?.email);

    if (isEmailValid) {
      // Nếu địa chỉ email hợp lệ, gọi API POST
      setIsLoading(true);
      axios
        .post("http://localhost:3001/users/SendMailOTP", {
          UserMail: formData.email,
        })
        .then((response) => {
          // Xử lý kết quả trả về từ server (nếu cần)
          console.log("Server response:", response.data);
          if (
            response.data.message == "Verification email sent successfully."
          ) {
            setShowOTPModal(true);
            // gọi thêm cho tui một api post gửi user_mail và otp_code
          }
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("There was a problem with the axios request:", error);
          alert("");
        })
        .finally(() => {
          // Kết thúc loading sau khi nhận được phản hồi từ API
          setIsLoading(false);
        });
    } else {
      // Nếu địa chỉ email không hợp lệ, thực hiện các hành động phù hợp (ở đây là log ra console và thiết lập trạng thái email)
      console.log("Email không hợp lệ");
      setStatusEmail(false);
    }

    // Hiển thị modal

    // Log ra giá trị của hàm validateEmail
    console.log("bbb", isEmailValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // Nếu form không hợp lệ, cập nhật validated state và ngăn chặn submit
      setValidated(true);
      return;
    }
    if (!formData.image) {
      // Nếu không có avatar được chọn, hiển thị thông báo và ngăn chặn submit
      alert("Please upload an avatar.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      // Nếu mật khẩu và mật khẩu xác nhận không trùng khớp, hiển thị thông báo và ngăn chặn submit
      alert("Passwords do not match.");
      return;
    }
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
  };

  const handleRemoveAvatar = (index) => {
    const newAvatars = [...formData.image];
    newAvatars.splice(index, 1);
    setFormData({ ...formData, image: newAvatars });
  };

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
  const handleInputChange = (e) => {
    const { value } = e.target;
    setOtp(value.replace(/\D/, '')); // Loại bỏ tất cả các ký tự không phải là số
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
                <Form.Group controlId="fullName">
                  <Form.Label>FullName</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a fullName.
                  </Form.Control.Feedback>
                </Form.Group>
                {/* tạo một select option chọn gender giúp tui gồm male và female */}
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <div
                    className="gender-icons"
                    disabled={!emailVerified}
                    style={{ pointerEvents: emailVerified ? "auto" : "none" }}
                  >
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
                    value={formData?.role_id}
                    onChange={handleChange}
                    disabled={!emailVerified}
                  >
                    <option value="">Select Role</option>
                    {rolePage.map((roleOption) => (
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
                    pattern="[0-9]{10}" // Bắt buộc nhập 10 chữ số
                    maxLength={10}
                    disabled={!emailVerified}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the phone number and it must be 10 digits.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Avatar</Form.Label>
                  <div
                    {...getAvatarRootProps()}
                    className="dropzone"
                    style={{ pointerEvents: emailVerified ? "auto" : "none" }}
                  >
                    <input {...getAvatarInputProps()} />
                    <div className="dropzone-content">
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
                type="text"
                className="otp"
                placeholder="Nhập OTP"
                value={otp}
                onChange={handleInputChange}
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
      <div>
        {isLoading && <FaSpinner className="spinner" />}
        {/* Các thành phần khác của giao diện */}
      </div>
    </>
  );
};

export default SignUpPage;
