import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { Button } from "react-bootstrap";
import { BookTabe } from "./BookTable";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBurrows } from "../../helper/axiosHelper";

const Books = () => {

  return (
    <UserLayout title="All available Books">
      <div className="text-end mb-3">
        <Link to="/newBook">
          <Button variant="primary">Add new Book</Button>
        </Link>
      </div>
      {/* book listing table */}
      <BookTabe />
    </UserLayout>
  );
};

export default Books;
