import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { BookTabe } from "./BookTable";
import { ReviewTable } from "./ReviewTable";
import { useDispatch } from "react-redux";
import { fetchReviewsAction } from "./bookAction";

const ReviewPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviewsAction());
  }, [dispatch]);
  return (
    <UserLayout title="Reviews">
      {/* book listing table */}
      <ReviewTable />
    </UserLayout>
  );
};

export default ReviewPage;
