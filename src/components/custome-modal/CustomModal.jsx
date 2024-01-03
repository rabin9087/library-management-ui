import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../system-state/systemSlice";

export const CustomModal = ({ title, children, ...rest }) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.systemInfo);
  return (
    <Modal
      onHide={() => dispatch(setShowModal(false))}
      {...rest}
      size="lg"
      show={showModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Review of the book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
