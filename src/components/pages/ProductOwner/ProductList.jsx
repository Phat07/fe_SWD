import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ModalConfirmDeleteProduct from "./ModalConfirmDeleteProduct"; // Make sure this is adapted to use React Bootstrap as well
import Header from "../../Header";
import Footer from "../../Footer";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Product() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [data, setData] = useState([
    { id: 1, name: "Product 1", status: "chua dau gia" },
    { id: 2, name: "Product 2", status: "da dau gia" },
    // Add more sample data here
  ]);

  const navigate = useNavigate();

  const handleDelete = (auction) => {
    console.log("Delete item with id:", auction.id);
    setDeleteData(auction);
    setShowDelete(true);
  };

  const handleDetailAuction = (auction) => {
    // navigate(`/auction-detail/${auction.id}`);
    console.log("Update user at id:", auction.id);
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
                <strong>Auction</strong>
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            {item.status === "da dau gia" ? (
                              <Badge bg="success">da dau gia</Badge>
                            ) : (
                              <Badge bg="warning">chua dau gia</Badge>
                            )}
                          </td>
                          <td>
                            {handleDetailAuction && (
                              <Button
                                variant="success"
                                onClick={() => handleDetailAuction(item)}
                              >
                                Detail
                              </Button>
                            )}{" "}
                            {handleDelete && (
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(item)}
                              >
                                Delete
                              </Button>
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
