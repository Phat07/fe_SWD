import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import "../../../css/createProduct.css";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actProductPostAsync } from "../../../store/product/action";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function CreateProductForm() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productVideos, setProductVideos] = useState([]);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.USER.currentUser);
  const dispatch = useDispatch();
  const token = localStorage.getItem("ACCESS_TOKEN");
  
  // Create refs for file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Function to reset form fields
  const resetFormFields = () => {
    setProductName("");
    setDescription("");
    setProductImages([]);
    setProductVideos([]);
    // Reset file input fields
    imageInputRef.current.value = "";
    videoInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !productName ||
      !description ||
      productImages.length === 0 ||
      productVideos.length === 0
    ) {
      toast.error(
        "Vui lòng điền tất cả các trường và chọn ít nhất một ảnh và một video!"
      );
      return;
    }

    let data = new FormData();
    data.append("name", productName);
    data.append("description", description);
    data.append("host_id", user._id);

    productImages.forEach((image, index) => {
      data.append(`image`, image.file);
    });

    productVideos.forEach((video, index) => {
      data.append(`video`, video.file);
    });

    setIsSubmitting(true);
    dispatch(actProductPostAsync(data, token)).then(() => {
      setIsSubmitting(false);
      resetFormFields(); // Reset form fields after successful submission
      navigate("/manage-product")
    });
    
  };

  const isImageExist = (url) => {
    return productImages.some((image) => image.url === url);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files)
      .filter((file) => !isImageExist(URL.createObjectURL(file)))
      .map((file) => ({
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
    const removedImageUrl = productImages[index].url;
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
    URL.revokeObjectURL(removedImageUrl);
  };

  const removeVideo = (index) => {
    const removedVideoUrl = productVideos[index].url;
    const updatedVideos = [...productVideos];
    updatedVideos.splice(index, 1);
    setProductVideos(updatedVideos);
    URL.revokeObjectURL(removedVideoUrl);
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="container" style={{ marginBottom: "20px" }}></div>
        <Container>
          <h1>Tạo sản phẩm</h1>
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
                        ref={imageInputRef} // Set ref for image input
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
                        ref={videoInputRef} // Set ref for video input
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
                {isSubmitting ? (
                  <>
                    <div className="overlay"></div>
                    <div className="spinner-container">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </>
                ) : (
                  ""
                )}
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
