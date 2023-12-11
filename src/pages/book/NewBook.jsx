import React, { useState } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { BookTabe } from "./BookTable";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/custome-input/CustomInput";
import { postNewBookAction } from "./bookAction";

const NewBook = () => {
  const dispatch = useDispatch();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  const handelOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewBookAction(book)) && navigate("/books");
  };
  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
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
    },

    {
      label: "Thumbnail Link",
      name: "thumbnail",
      placeholder: "https://....",
      type: "url",
      required: true,
    },
    {
      label: "Author",
      name: "author",
      placeholder: "Rambo",
      type: "text",
      required: true,
    },
    {
      label: "Publish Year",
      name: "publishYear",
      placeholder: "2000",
      type: "number",
    },
    {
      label: "ISBN",
      name: "isbn",
      placeholder: "85368526",
      type: "text",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Book details",
      type: "text",
      as: "textarea",
      required: true,
      rows: 5,
    },
  ];
  return (
    <UserLayout title="Add New book" className="">
      <Link to="/books" className=" ms-3">
        <Button variant="secondary">&lt; Back</Button>
      </Link>
      <div className="mt-3  m-3">
        <Form onSubmit={handelOnSubmit} className="">
          <h4>Enter books details below</h4>
          <hr />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handelOnChange} />
          ))}

          <div className="d-grid mt-2">
            <Button className="primary" type="submit">
              Add New Book
            </Button>
          </div>
        </Form>
      </div>
    </UserLayout>
  );
};

export default NewBook;
