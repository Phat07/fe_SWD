// import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ModalConfirmJoinRoom = (props) => {
  const navigate = useNavigate();
  const { auctionData, showProp, handleClose } = props;
  // const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    // const res = await deleteUser(userDeleteData.id);
    // console.log("check delete status =>> ", res);
    // if (res && +res.statusCode === 204) {
    //   setShow(false);
    //   toast.success(`Delete User ${userDeleteData.name} success !`);
    //   handleClose();
    // } else {
    //   toast.warning("Delete user fail !");
    //   handleClose();
    // }
    navigate(`/join-room-auction/${auctionData.id}`);
  };

  return (
    <>
      <Modal
        show={showProp}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Join Auction Room {auctionData.title} <br /> with Produtc code{" "}
            {auctionData.productCode}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pass to join Auction</Form.Label>
              <Form.Control type="password" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalConfirmJoinRoom.propTypes = {
  // Xác định rằng `userDeleteData` là một đối tượng và là required
  auctionData: PropTypes.shape({
    productCode: PropTypes.string, // Giả sử id là một số và là required
    title: PropTypes.string,
    id: PropTypes.number, // Giả sử name là một chuỗi và là required
    // Bạn có thể thêm các thuộc tính khác của userDeleteData ở đây nếu cần
  }).isRequired,

  // Xác định rằng `showProp` là một boolean và là required
  showProp: PropTypes.bool.isRequired,

  // Xác định rằng `handleClose` là một hàm và là required
  handleClose: PropTypes.func.isRequired,
};

export default ModalConfirmJoinRoom;
