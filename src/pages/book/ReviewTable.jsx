import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewAction, fetchReviewsAction, updateReviewAction } from "./bookAction";
import { useEffect } from "react";

export const ReviewTable = () => {
  const dispatch = useDispatch()
  const { reviews } = useSelector((state) => state.bookInfo);

  const handelOnStatusUpdate = (e) => {
    const { value, checked } = e.target;
    if(window.confirm("Are you sure want to update?")){
      dispatch(updateReviewAction({
        _id: value,
        status: checked ? "active" : "inactive"
      }))
    }
  };

  const handelOnDelete = (_id) => {
    
    if(window.confirm("Are you sure want to delete this review?")){
      dispatch(deleteReviewAction(_id))
    }
  };

  useEffect(()=> {
    dispatch(fetchReviewsAction())
  }, [dispatch])

  return (
    <div className="m-3">
      <p className="d-flex justify-content-between">
        <label htmlFor=""> {reviews.length} reviews found!</label>
        <div>
          <Form.Control
            type="text"
            placeholder="search book by name"
            className="text"
          />
        </div>
      </p>

      <Table striped bordered hover className="">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>status</th>
            <th>Book Name</th>
            <th>Review Title</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(
            ({ _id, status, title, message, rating, bookName }, i) => (
              <tr key={i}>
                <td>{1 + i}</td>
                <td>
                  <Form.Check
                    type="switch"
                    checked={status === "active"}
                    id="custom-switch"
                    label={status}
                    onChange={handelOnStatusUpdate}
                    value={_id}
                  />
                </td>
                <td>
                  <h4> {bookName}</h4>
                </td>
                <td>{title}</td>
                <td>{message} ....</td>
                <td>{rating}</td>
                <td>
                  <Button variant="danger" onClick={handelOnDelete(_id)}>Delete</Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
