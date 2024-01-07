import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { deleteBookAction, getAllBooksAction } from "./bookAction";
import Search from "../../components/searchComponent/Search";

export const BookTabe = () => {
  const { books } = useSelector((state) => state.bookInfo);
  const [tempBooks, setTempBooks] = useState(books);
  const dispatch = useDispatch();

  const handelOnDelete = async (_id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} book?`)) {
      //_id
      dispatch(deleteBookAction(_id));
      dispatch(getAllBooksAction());
      return setTempBooks(books);
    }
  };

  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  useEffect(() => {
    setTempBooks(books);
  }, [books]);

  return (
    <div className="m-3 contentHeight">
      <div className="d-flex justify-content-between">
        <label htmlFor=""> {tempBooks.length} books found!</label>

        {tempBooks.length === 0 && (
          <Alert variant="warning">No book found!</Alert>
        )}

        <div>
          <Search
            data={books}
            setSearchedData={setTempBooks}
            type={"books"}
            placeholder={"Search by book name"}
          />
        </div>
      </div>

      <Table striped bordered hover className="table-container mt-2 ">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Thumbnail</th>
            <th>Book Name</th>
            <th>Book Info</th>
            <th>Book Summary</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tempBooks.map(
            (
              {
                _id,
                thumbnail,
                status,
                name,
                author,
                publishYear,
                description,
              },
              i
            ) => (
              <tr key={i}>
                <td>{1 + i}</td>
                <td>
                  <img
                    src={thumbnail}
                    alt=""
                    width={"120px"}
                    height={"120px"}
                  />
                </td>
                <td>
                  <h4> {name}</h4>
                  <p>
                    <span
                      className={
                        status === "active"
                          ? "bg-success p-2 rounded text-light"
                          : "bg-danger p-2 rounded text-light"
                      }
                    >
                      {status}
                    </span>
                  </p>
                </td>
                <td>
                  {author} . {publishYear}
                </td>
                <td>{description.slice(0, 100)} ....</td>
                <td>
                  <div className="d-grid mt-3 text-light gap-2">
                    <Link to={`/edit-book/${_id}`} className="d-grid">
                      <Button variant="warning">
                        {" "}
                        <FaEdit /> Edit
                      </Button>
                    </Link>

                    <Link className="d-grid">
                      <Button
                        variant="danger"
                        onClick={() => handelOnDelete(_id, name)}
                        className="d-flex"
                      >
                        <AiFillDelete className="mt-1 me-1" /> Delete
                      </Button>
                    </Link>
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
