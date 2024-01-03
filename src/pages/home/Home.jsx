import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { CustomeCarousel } from "../../components/carousel/CustomCarousel";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CustomeCard } from "../../components/custom-card/CustormCard";
import { Link } from "react-router-dom";
import Search from "../../components/searchComponent/Search";

const Home = () => {
  const [filterdBook, setFilteredBook] = useState([]);
  const { books } = useSelector((state) => state.bookInfo);
  useEffect(() => {
    const activeBooks = books.filter((book) => book.status === "active");
    setFilteredBook(activeBooks);
  }, [books]);

  return (
    <MainLayout>
      <div className="vh-80">
        {/* carousel */}
        <CustomeCarousel />
        {/* book list cart */}
        <Container className="mt-5" fluid>
          <Row>
            <Col className="d-flex justify-content-between">
              <label htmlFor=""> {filterdBook.length} books found</label>
              {filterdBook.length === 0 && (
                <Alert variant="warning">No book found!</Alert>
              )}
              <div>
                <Search
                  data={books}
                  setSearchedData={setFilteredBook}
                  type={"books"}
                  placeholder={"Search by book name"}
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="mt-5">
            <Col className="d-flex justify-content-center flex-wrap mt-5 gap-2">
              {filterdBook.map((book, i) => (
                <Link key={book._id} to={`/book/${book._id}`}>
                  <CustomeCard {...book} />
                </Link>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Home;
