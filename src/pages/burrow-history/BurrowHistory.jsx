import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBurrows } from "../../helper/axiosHelper";
import { fetchBurrowsAction } from "./burrowActions";
import { BurrowHistoryTable } from "../../components/burrow-history/BurrowHistoryTable";

const BurrowHistory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    user?.role === "admin" && dispatch(fetchBurrowsAction());
  }, [user?.role, dispatch]);

  return user?.role === "admin" ? (
    <UserLayout title="Burrow History ">
      <BurrowHistoryTable />
    </UserLayout>
  ) : (
    <h1>Unauthorized</h1>
  );
};

export default BurrowHistory;
