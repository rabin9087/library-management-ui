import { Alert, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { deleteReviewAction, updateReviewAction } from "./bookAction";
import { useState } from "react";
import Search from "../../components/searchComponent/Search";

export const ReviewTable = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.bookInfo);
  const [tempBooks, setTempBooks] = useState(reviews);

  const handelOnStatusUpdate = (e) => {
    const { value, checked } = e.target;
    if (window.confirm("Are you sure want to update?")) {
      dispatch(
        updateReviewAction({
          _id: value,
          status: checked ? "active" : "inactive",
        })
      );
    }
  };

  const handelOnDelete = (_id) => {
    if (window.confirm("Are you sure want to delete this review?")) {
      dispatch(deleteReviewAction(_id));
    }
  };

  return (
    <div className="m-3">
      <p className="d-flex justify-content-between">
        <label htmlFor=""> {tempBooks.length} reviews found!</label>

        {tempBooks.length === 0 && (
          <Alert variant="warning">No reviews found!</Alert>
        )}

        <div>
          <Search
            data={reviews}
            setSearchedData={setTempBooks}
            type={"reviewBook"}
            placeholder={"Search by book name"}
          />
        </div>
      </p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>status</th>
            <th>Book Name</th>
            <th>Review Given By</th>
            <th>Review Title</th>
            <th>Message</th>
            <th>Rating</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tempBooks.map(
            (
              { _id, status, title, message, rating, bookName, userName },
              i
            ) => (
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
                <td>{userName}</td>
                <td>{title}</td>
                <td>{message} ....</td>
                <td>{rating}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      variant="danger"
                      onClick={() => handelOnDelete(_id)}
                      className="d-flex"
                    >
                      <AiFillDelete className="mt-1 me-1" /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
