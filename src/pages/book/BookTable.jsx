import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const BookTabe = () => {
  const { books } = useSelector((state) => state.bookInfo);
  return (
    <div className="m-3">
      <p className="d-flex justify-content-between">
        <label htmlFor=""> {books.length} books found!</label>
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
            <th>Thumbnail</th>
            <th>Book Name</th>
            <th>Book Info</th>
            <th>Book Summary</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {books.map(
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
                    width={"140px"}
                    height={"160px"}
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
                  <Link to={`/edit-book/${_id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
