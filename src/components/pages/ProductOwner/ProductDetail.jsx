import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Carousel,
  Spinner,
} from "react-bootstrap";
import Header from "../../Header";
import Footer from "../../Footer";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {
  actProductGetAsync,
  actProductPutAsync,
} from "../../../store/product/action";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const { productId } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const products = useSelector((state) => state.PRODUCT.productsALL);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productVideos, setProductVideos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    dispatch(actProductGetAsync(token));
  }, []);
  useEffect(() => {
    const item = products.find((i) => i._id === productId);
    setProduct(item);

    if (item) {
      setProductName(item?.name);
      setDescription(item?.description);
      const initialImages = item?.image?.map((imgUrl) => ({
        file: null, // Không có file thực tế ở đây, chỉ có URL
        url: imgUrl,
      }));
      setProductImages(initialImages);

      const initialVideos = item?.video?.map((videoUrl) => ({
        file: null, // Tương tự như trên, không có file thực tế
        url: videoUrl,
      }));
      setProductVideos(initialVideos);
    }
  }, [productId, products]);
  const user = useSelector((state) => state.USER.currentUser);

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

  const handleSubmit = () => {
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

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("host_id", user._id);

    productImages.forEach((image) => {
      formData.append("image", image.file);
    });

    productVideos.forEach((video) => {
      formData.append("video", video.file);
    });
    setIsSubmitting(true);
    if (productId) {
      dispatch(actProductPutAsync(productId, formData, token)).then(() => {
        // setIsSubmitting(false);
        resetFormFields();
        navigate("/manage-product");
      });
    }
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
        <Row>
          <Col xs={12}>
            <Card className="mb-4">
              <Card.Header>
                <strong>Thông Tin Chi Tiết Product với ID {productId} </strong>
              </Card.Header>
              <Card.Body>
                {/* <Form> */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Card>
                      {product?.status === false ? (
                        <Card.Body>
                          <Card.Title>Upload Ảnh Sản Phẩm</Card.Title>
                          <Form.Group
                            controlId="formFileMultiple"
                            className="mb-3"
                          >
                            <Form.Label>Chọn ảnh sản phẩm</Form.Label>
                            <Form.Control
                              type="file"
                              multiple
                              onChange={handleImageChange}
                              ref={imageInputRef} // Set ref for image input
                            />
                          </Form.Group>
                          {productImages?.map((image, index) => (
                            <div key={index} style={{ position: "relative" }}>
                              <img
                                src={image.url}
                                alt="Product"
                                style={{ maxWidth: "100%" }}
                              />
                              <Button
                                variant="danger"
                                onClick={() => removeImage(index)}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          ))}
                        </Card.Body>
                      ) : (
                        <Card.Body>
                          <Card.Title>Ảnh Sản Phẩm</Card.Title>
                          <Carousel>
                            {product?.image?.map((image, index) => (
                              <Carousel.Item key={index}>
                                <img
                                  className="d-block w-100"
                                  src={image}
                                  alt={`Slide ${index + 1}`}
                                  style={{
                                    height: "400px",
                                    objectFit: "cover",
                                    width: "100%",
                                  }}
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </Card.Body>
                      )}
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card>
                      {product?.status === false ? (
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
                          {productVideos?.map((video, index) => (
                            <div
                              key={index}
                              style={{
                                position: "relative",
                                marginTop: "20px",
                              }}
                            >
                              <video controls style={{ maxWidth: "100%" }}>
                                <source src={video?.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <Button
                                variant="danger"
                                onClick={() => removeVideo(index)}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          ))}
                        </Card.Body>
                      ) : (
                        <Card.Body>
                          <Card.Title>Video Sản Phẩm</Card.Title>
                          <div
                            style={{
                              position: "relative",
                              marginTop: "20px",
                            }}
                          >
                            <video controls style={{ maxWidth: "100%" }}>
                              {product?.video?.map((video, index) => (
                                <source
                                  key={index}
                                  src={video}
                                  type="video/mp4"
                                />
                              ))}
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </Card.Body>
                      )}
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
                          {product?.status === false ? (
                            <Form.Control
                              type="text"
                              placeholder="Nhập tên sản phẩm"
                              // readOnly={product?.status === true}
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                            />
                          ) : (
                            <Form.Control
                              type="text"
                              placeholder="Nhập tên sản phẩm"
                              readOnly={product?.status === true}
                              value={product?.name}
                            />
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Mô tả</Form.Label>
                          {product?.status === false ? (
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Mô tả sản phẩm"
                              // readOnly={product?.status === true}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          ) : (
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Mô tả sản phẩm"
                              readOnly={product?.status === true}
                              value={product?.description}
                            />
                          )}
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs="auto" className="mt-2">
                    <Button variant="success" onClick={() => navigate(-1)}>
                      Back
                    </Button>{" "}
                    {product?.status === false ? (
                      <Button
                        variant="danger"
                        onClick={() =>
                          navigate(`/create-auction/${product._id}`)
                        }
                      >
                        Create Auction
                      </Button>
                    ) : (
                      <strong>San pham dang tren ke</strong>
                    )}{" "}
                    {product?.status === false ? (
                      <Button variant="warning" onClick={handleSubmit}>
                        Update Product
                      </Button>
                    ) : (
                      <strong>San pham dang tren ke</strong>
                    )}
                  </Col>
                </Row>
                {/* </Form> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
