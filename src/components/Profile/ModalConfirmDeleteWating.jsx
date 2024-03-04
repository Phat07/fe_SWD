import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
// import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ModalConfirmDeleteWating = (props) => {
  const { deleteData = [], showProp, handleClose } = props;
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
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add New User
      </Button> */}

      <Modal
        show={showProp}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel registration Auction {deleteData.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>You want to cancel registration auction: {deleteData.name}</div>
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

// Định nghĩa propTypes cho component
ModalConfirmDeleteWating.propTypes = {
  // Xác định rằng `userDeleteData` là một đối tượng và là required
  deleteData: PropTypes.shape({
    id: PropTypes.number, // Giả sử id là một số và là required
    name: PropTypes.string, // Giả sử name là một chuỗi và là required
    // Bạn có thể thêm các thuộc tính khác của userDeleteData ở đây nếu cần
  }).isRequired,

  // Xác định rằng `showProp` là một boolean và là required
  showProp: PropTypes.bool.isRequired,

  // Xác định rằng `handleClose` là một hàm và là required
  handleClose: PropTypes.func.isRequired,
};

export default ModalConfirmDeleteWating;
