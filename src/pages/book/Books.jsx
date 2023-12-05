import React from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useSelector } from "react-redux";

const Books = () => {
  const { user } = useSelector((state) => state.adminInfo);
  return user?.role === "admin" ? (
    <UserLayout title="My Profile">
      
    </UserLayout>
  ) : (
    <h1>Unauthorized</h1>
  );
};

export default Books;
