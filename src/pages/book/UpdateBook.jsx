import React, { useEffect, useState } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../components/custome-input/CustomInput";
import { getABookAction, updateBookAction } from "./bookAction";

const UpdateBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //grab the _id from url
  const { _id } = useParams();

  const [form, setForm] = useState({});
  //get the selectedBook from state and populate in the form
  const { selectedBook } = useSelector((state) => state.bookInfo);

  //add that book in the store
  useEffect(() => {
    if (_id !== form._id) {
      dispatch(getABookAction(_id));
      setForm(selectedBook);
    }
  }, [_id, dispatch, form._id, selectedBook]);

  const handelOnSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to update this book?")) {
      return;
    }
    const { __v, updatedAt, isAvailable, dueDate, isbn, createdAt, ...rest } =
      form;
    dispatch(updateBookAction(rest)) && navigate("/books");
  };

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const inputs = [
    {
      label: "Book Name",
      name: "name",
      placeholder: "Javascript",
      type: "text",
      required: true,
      value: form.name,
    },

    {
      label: "Thumbnail Link",
      name: "thumbnail",
      placeholder: "https://....",
      type: "url",
      required: true,
      value: form.thumbnail,
    },
    {
      label: "Author",
      name: "author",
      placeholder: "Rambo",
      type: "text",
      required: true,
      value: form.author,
    },
    {
      label: "Publish Year",
      name: "publishYear",
      placeholder: "2000",
      type: "number",
      value: form.publishYear,
    },
    {
      label: "ISBN",
      name: "isbn",
      placeholder: "85368526",
      type: "text",
      required: true,
      disabled: true,
      value: form.isbn,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Book details",
      type: "text",
      as: "textarea",
      required: true,
      value: form.description,
      rows: 5,
    },
  ];
  return (
    <UserLayout title="Update book" className="">
      <Link to="/books" className=" ms-3">
        <Button variant="secondary">&lt; Back</Button>
      </Link>
      <div className="mt-3 m-3">
        <Form onSubmit={handelOnSubmit} className="">
          <h4>Update details of book</h4>
          <hr />

          <Form.Group className="mb-3">
            <label htmlFor="">Status</label>
            <Form.Select name="status" onChange={handelOnChange}>
              <option value="">--Select one--</option>
              <option value="active" selected={form.status === "active"}>
                --Active--
              </option>
              <option value="inactive" selected={form.status === "inactive"}>
                --InActive--
              </option>
            </Form.Select>
          </Form.Group>
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handelOnChange} />
          ))}

          <div className="d-grid mt-2">
            <Button className="primary" type="submit">
              Update Book
            </Button>
          </div>
        </Form>
      </div>
    </UserLayout>
  );
};

export default UpdateBook;
