import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

export const BookTabe = () => {
    const {books} = useSelector((state) => state.bookInfo)
  return (
    <div className="">
      <p className="d-flex justify-content-between">
        <label htmlFor=""> 10 books fround!</label>
        <div>
        <Form.Control type="text" placeholder="search book by name" className="text" />
        </div>
      </p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Book Name</th>
            <th>Book Info</th>
            <th>Book Summary</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
            {books.map (({thumbnail, name, author, isbn, publishYear, description}, i) => (
                <tr key={i}>
                    <td>{1 + i}</td>
                    <td>
                        <img src={thumbnail} alt="" width={'150px'} />
                    </td>
                    <td>
                        {name}
                    </td>
                    <td>{author} . {publishYear}</td>
                    <td>{description.slice(0, 100)} ....</td>
                    <td>
                        <Button variant="warning">
                            Edit
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
