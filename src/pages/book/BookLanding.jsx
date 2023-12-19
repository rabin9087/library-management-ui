import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getABookAction } from "./bookAction";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { postBurrowAction } from "../burrow-history/burrowActions";
import ReviewStars from "../../components/review/ReviewStars";

const BookLanding = () => {
  //grab the _id from url parameter
  const { _id } = useParams();
  const dispatch = useDispatch();

  const [showReview, setShowReview] = useState(false);

  //pull the book infor from the state and implement in UI below
  const { selectedBook, reviews } = useSelector((state) => state.bookInfo);
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    //fetch book from server to get latest update and put in our store
    _id && dispatch(getABookAction(_id));
  }, [_id, dispatch]);

  const {
    thumbnail,
    name,
    author,
    publishYear,
    description,
    isAvailable,
    dueDate,
  } = selectedBook;

  const handelOnBurrow = () => {
    if (
      window.confirm(
        "Aru sure want to burrow this book and return in 15 days ?"
      )
    ) {
      const obj = {
        bookId: _id,
        bookName: name,
        thumbnail,
        userId: user._id,
        userName: user.fName,
      };
      dispatch(postBurrowAction(obj));
    }
  };

  const bookSpecificReviews = reviews.filter(
    (review) => review.status === "active" && review.bookId === _id
  );

  const averageRating =
    bookSpecificReviews.reduce((acc, item) => acc + item.rating, 0) /
    bookSpecificReviews.length;

  return (
    <MainLayout>
      <Container>
        <Row className="mt-4">
          <Col md={5} className="">
            <img
              src={thumbnail}
              alt=""
              width="100%"
              className="shadow-lg img-thumbnail"
            />
          </Col>

          <Col md={7}>
            <h1>{name}</h1>
            <p>
              Author: {author} <br />
              Publish Year: {publishYear}
            </p>

            {/* Rating of individual book */}
            <ReviewStars averageRating={averageRating} />

            <p className="pt-3">Summary: {description?.slice(0, 120)}...</p>
            <p className="d-grid pt-2">
              {isAvailable ? (
                user?._id ? (
                  <Button onClick={handelOnBurrow}>Burrow Book</Button>
                ) : (
                  <Link to="/login" className="d-grid">
                    <Button>Login To Burrow</Button>
                  </Link>
                )
              ) : (
                <Button disabled={true}>
                  Avaialbe from: {dueDate?.slice(0, 10)}
                </Button>
              )}
            </p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="border p-2 rounded">
            <div className="button-group">
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={() => setShowReview(false)}>
                  Description
                </Button>
                <Button variant="warning" onClick={() => setShowReview(true)}>
                  Reviews
                </Button>
              </ButtonGroup>
            </div>

            {showReview ? (
              <>
                {" "}
                {bookSpecificReviews.map((review) => (
                  <div className="d-flex gap-3 shadow mb-4">
                    <div className="avatar">RA</div>
                    <div className="review">
                      <h4>{review.title}</h4>
                      <p className="mb-3">
                        <ReviewStars averageRating={review.rating} />
                        <small>{review.createdAt?.slice(0, 10)}</small>
                      </p>
                      <p className="lorem"></p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              description
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default BookLanding;
