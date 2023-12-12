import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getABookAction } from "./bookAction";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const BookLanding = () => {
  //grab the _id from url parameter
  const { _id } = useParams();
  const dispatch = useDispatch();

  const [showReview, setShowReview] = useState(false);

  //pull the book infor from the state and implement in UI below
  const { selectedBook } = useSelector((state) => state.bookInfo);
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    //fetch book from server to get latest update and put in our store
    _id && dispatch(getABookAction(_id));
  }, [_id, dispatch]);

  const { thumbnail, name, author, publishYear, description } = selectedBook;

  return (
    <MainLayout>
      <Container>
        <Row className="mt-4" g-3>
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
            <p className="mb-5">
              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
              <FaStarHalfAlt className="text-warning" />
            </p>
            <p className="pt-3">Summary: {description?.slice(0, 120)}...</p>
            <p className="d-grid pt-2">
              {user?._id ? (
                <Button>Burrow Book</Button>
              ) : (
                <Link to="/login" className="d-grid">
                  <Button>Log in To Burrow</Button>
                </Link>
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
                <div className="d-flex gap-3 shadow mb-4">
                  <div className="avatar">RA</div>
                  <div className="review">
                    <h4>Best Book ever</h4>
                    <p className="mb-3">
                      <span>
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStarHalfAlt className="text-warning" />
                      </span>
                      <small>5 days ago</small>
                    </p>
                    <p className="lorem">
                      Until recently, the prevailing view assumed lorem ipsum
                      was born as a nonsense text. “It's not Latin, though it
                      looks like it, and it actually says nothing,” Before &
                      After magazine answered a curious reader, “Its ‘words’
                      loosely approximate the frequency with which letters occur
                      in English, which is why at a glance it looks pretty
                      real.”
                    </p>
                  </div>
                </div>
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
