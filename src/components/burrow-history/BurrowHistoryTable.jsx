import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBurrowsAction,
  returnBurrowedBookAction,
} from "../../pages/burrow-history/burrowActions";
import Review from "../review/Review";
import { CustomModal } from "../custome-modal/CustomModal";
import { useEffect, useState } from "react";
import { setShowModal } from "../../system-state/systemSlice";
import Search from "../searchComponent/Search";

export const BurrowHistoryTable = ({ userId }) => {
  const [selectedBurrow, setSelectedBurrow] = useState({});
  //If this is requested from all burrow history
  const dispatch = useDispatch();
  let { burrows } = useSelector((state) => state.burrowInfo);
  const [tempBooks, setTempBooks] = useState(burrows);
  //if show only admins burrow books list

  //applies to admin and students both
  if (userId) {
    burrows = burrows.filter((item) => item.userId === userId);
  }

  const handelOnReturn = (_id, bookName) => {
    if (window.confirm(`Are you ready to return ${bookName} book?`)) {
      //call the api to update the booj and re fetch all the burrow history to synchronize the update via action
      dispatch(returnBurrowedBookAction(_id));
    }
  };

  const handelOnReview = (obj) => {
    setSelectedBurrow(obj);
    //show modal
    dispatch(setShowModal(true));
  };

  useEffect(() => {
    dispatch(fetchBurrowsAction());
  }, [dispatch]);

  useEffect(() => {
    setTempBooks(burrows);
  }, [burrows]);

  return (
    <div className="m-3 min-vh-100">
      <CustomModal title="Give Reviews" show={true}>
        <Review {...selectedBurrow} />
      </CustomModal>

      <p className="d-flex justify-content-between">
        <label htmlFor=""> {tempBooks.length} burrows history found!</label>

        {tempBooks.length === 0 && (
          <Alert variant="warning">No book found!</Alert>
        )}

        <div>
          <Search
            data={burrows}
            setSearchedData={setTempBooks}
            type={"reviewBook"}
            placeholder={"Search by book name"}
          />
        </div>
      </p>

      <Table striped bordered hover className="">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Thumbnail</th>
            <th>Book Name</th>
            <th>Student Name</th>
            <th>Burrowed Date</th>
            <th>Due Date</th>
            <th>Returned</th>
          </tr>
        </thead>
        <tbody>
          {tempBooks.map(
            (
              {
                _id,
                thumbnail,
                userName,
                bookId,
                bookName,
                dueDate,
                isReturned,
                createdAt,
                reviewGiven,
              },
              i
            ) => (
              <tr key={_id} className="tr-red">
                <td>{1 + i}.</td>
                <td>
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    width={"80px"}
                    height={"80px"}
                  />
                </td>
                <td>
                  <h4>{bookName}</h4>
                </td>
                <td>{userName}</td>
                <td>{createdAt.slice?.(0, 10)} </td>
                <td>{dueDate.slice?.(0, 10)} </td>
                {userId ? (
                  <td>
                    {isReturned ? (
                      reviewGiven ? (
                        <span className="text-success">Review Recived</span>
                      ) : (
                        <Button
                          variant="warning"
                          onClick={() =>
                            handelOnReview({ _id, bookId, bookName })
                          }
                        >
                          Leave Review
                        </Button>
                      )
                    ) : (
                      <Button onClick={() => handelOnReturn(_id, bookName)}>
                        Return Book
                      </Button>
                    )}{" "}
                  </td>
                ) : (
                  <td>{isReturned ? "Returned" : "Not Yet"}</td>
                )}
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
