import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ModalConfirmDeleteProduct from "./ModalConfirmDeleteProduct"; // Make sure this is adapted to use React Bootstrap as well
import Header from "../../Header";
import Footer from "../../Footer";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actProductGetByUserIdAsync } from "../../../store/product/action";
import { format } from "date-fns";

function Product() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  // const [data, setData] = useState([
  //   { id: 1, name: "Product 1", status: "chua dau gia" },
  //   { id: 2, name: "Product 2", status: "da dau gia" },
  //   // Add more sample data here
  // ]);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const user = useSelector((state) => state.USER.currentUser);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy - HH:mm");
  };
  const products = useSelector((state) => state.PRODUCT.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actProductGetByUserIdAsync(user?._id, token));
  }, [user]);
  const navigate = useNavigate();

  const handleDelete = (product) => {
    setDeleteData(product);
    setShowDelete(true);
  };

  const handleDetailAuction = (product) => {
    navigate(`/product-detail/${product._id}`);
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
                <strong>Product</strong>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-medium-emphasis small mb-0">
                    Display auctions in the system
                  </p>
                  <Button
                    variant="success"
                    onClick={() => {
                      navigate(`/create-product`);
                    }}
                  >
                    Create New Product
                  </Button>
                </div>
                <Row>
                  <Col xs="auto">
                    {" "}
                    {/* Sử dụng xs="auto" để ô chỉ chiếm không gian cần thiết */}
                    <Form className="d-flex mb-3" role="search">
                      <Form.Control
                        className="me-2"
                        type="search"
                        placeholder="Search Name Product"
                        aria-label="Search"
                      />
                      <Button variant="outline-success" type="submit">
                        Search
                      </Button>
                    </Form>
                  </Col>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                        <th>Auction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                              {item.status === false ? (
                                <Badge bg="warning">chua dau gia</Badge>
                              ) : (
                                <Badge bg="success">dang dau gia</Badge>
                              )}
                            </td>
                            <td> {formatDate(item?.timestamp)}</td>
                            <td>
                              {handleDetailAuction && (
                                <Button
                                  variant="success"
                                  onClick={() => handleDetailAuction(item)}
                                >
                                  Detail
                                </Button>
                              )}{" "}
                              {item.status === false && handleDelete && (
                                <Button
                                  variant="danger"
                                  onClick={() => handleDelete(item)}
                                >
                                  Delete
                                </Button>
                              )}
                            </td>
                            <td>
                              {item.status === false ? (
                                <Button
                                  variant="success"
                                  onClick={() =>
                                    navigate(`/create-auction/${item._id}`)
                                  }
                                >
                                  Create Auction
                                </Button>
                              ) : (
                                <strong>Sản phẩm đang trên kệ</strong>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <ModalConfirmDeleteProduct
            showProp={showDelete} // Ensure ModalConfirmDelete is adapted for React Bootstrap
            handleClose={() => setShowDelete(false)}
            deleteData={deleteData}
          />
        </Row>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Product;
