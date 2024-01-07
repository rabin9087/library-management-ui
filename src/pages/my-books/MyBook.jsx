import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { BurrowHistoryTable } from "../../components/burrow-history/BurrowHistoryTable";
import { useSelector } from "react-redux";

const MyBook = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <UserLayout title="My Books">
      <div className="contentHeight">
        <BurrowHistoryTable userId={user?._id} />
      </div>
    </UserLayout>
  );
};

export default MyBook;
