import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../custome-input/CustomInput";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { postNewReviewAction } from "../../pages/book/bookAction";

const Review = ({ bookId, _id, bookName }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ rating: 5 });
  const handelOnStar = (rating) => {
    setForm({
      ...form,
      rating,
    });
  };

  const handeOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handelOnSubmit = (e) => {
    e.preventDefault();
    const obj = { ...form, bookId, burrowHistoryId: _id, bookName };
    dispatch(postNewReviewAction(obj))
    //call api to create new review in the review table
  };

  return (
    <div>
      <Form onSubmit={handelOnSubmit}>
        <h3>You are giving reviews to {bookName}</h3>
        <CustomInput
          name="title"
          label="Title"
          required={true}
          placeholder="Best book Ever ....."
          onChange={handeOnChange}
        />

        <Form.Group className="mb-3">
          <Form.Label>Select rating</Form.Label>
          <div>
            {Array(5)
              .fill("")
              .map((str, i) => (
                <FaStar key={i}
                  className={
                    form.rating > i ? "new-star text-warning" : "new-start"
                  }
                  onClick={() => handelOnStar(i + 1)}
                />
              ))}
           
          </div>
        </Form.Group>

        <CustomInput
          name="message"
          label="Detail Review"
          required={true}
          rows="5"
          placeholder="Best book ever ....."
          as="textarea"
          onChange={handeOnChange}
        />

        <div className="d-grid">
          <Button type="submit"> Submit Review</Button>
        </div>
      </Form>
    </div>
  );
};

export default Review;
