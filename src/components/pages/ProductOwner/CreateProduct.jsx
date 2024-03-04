import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import { FaTrash } from "react-icons/fa";
function CreateProductForm() {
  // State for form fields
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [productImages, setProductImages] = useState([]); // Lưu trữ nhiều ảnh
  const [productVideos, setProductVideos] = useState([]); // Lưu trữ nhiều video
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log({
      productName,
      description,
      startingPrice,
      productImages,
      productVideos, // Include video in submission log for demonstration
    });
    // Ideally, here you would send the data to your backend or state management store
  };

  // Calculate default start and end times for auction
  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setProductImages((prev) => [...prev, ...newImages]);
  };

  const handleVideoChange = (e) => {
    const files = e.target.files;
    const newVideos = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setProductVideos((prev) => [...prev, ...newVideos]);
  };

  const removeImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setProductVideos((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}></div>
        <Container>
          <h1>Tạo san pham</h1>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>Upload Ảnh Sản Phẩm</Card.Title>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Label>Chọn ảnh sản phẩm</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        onChange={handleImageChange}
                      />
                    </Form.Group>
                    {productImages.map((image, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          src={image.url}
                          alt="Product"
                          style={{ maxWidth: "100%" }}
                        />
                        <Button
                          variant="danger"
                          onClick={() => removeImage(index)}
                          style={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>Upload Video Sản Phẩm</Card.Title>
                    <Form.Group
                      controlId="formFileMultipleVideo"
                      className="mb-3"
                    >
                      <Form.Label>Chọn video sản phẩm</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={handleVideoChange}
                      />
                    </Form.Group>
                    {productVideos.map((video, index) => (
                      <div
                        key={index}
                        style={{ position: "relative", marginTop: "20px" }}
                      >
                        <video controls style={{ maxWidth: "100%" }}>
                          <source src={video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <Button
                          variant="danger"
                          onClick={() => removeVideo(index)}
                          style={{ position: "absolute", top: 0, right: 0 }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>Thông Tin Sản Phẩm</Card.Title>
                    <Form.Group className="mb-3">
                      <Form.Label>Tên sản phẩm</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên sản phẩm"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Mô tả sản phẩm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Giá khởi điểm</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Giá khởi điểm"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs="auto" className="mt-2">
                <Button variant="primary" type="submit" className="me-2">
                  Create Product
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default CreateProductForm;
