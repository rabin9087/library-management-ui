import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.userInfo);
  return user?._id ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: { location } }} />
  );
};

export const AdminePrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.userInfo);
  console.log(location);

  //if there is user._id that means user is logged in\
  //if user.role === "admin" that user id admin

  if (user?._id && user?.role !== "admin") {
    return <h1>Unauthorized</h1>;
  }
  return user?.role === "admin" ? (
    children
  ) : (
    <h1>
      <Navigate to="/login" state={{ from: { location } }} />
    </h1>
  );
};
