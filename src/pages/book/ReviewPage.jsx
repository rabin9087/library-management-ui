import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { BookTabe } from "./BookTable";
import { ReviewTable } from "./ReviewTable";

const ReviewPage = () => {

  return (
    <UserLayout title="Reviews">
      
      {/* book listing table */}
      <ReviewTable />
    </UserLayout>
  );
};

export default ReviewPage;
