import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { getAllUserAction } from "../user_signup_login/userAction";
import { fetchBurrowsAction } from "../burrow-history/burrowActions";
import { fetchReviewsAction, getAllBooksAction } from "../book/bookAction";
import { Tooltip } from "recharts";
import BooksChart from "./charts/BooksChart";
import BooksHistoryChart from "./charts/BooksHistoryChart";
import RolesChart from "./charts/RolesChart";
import BooksStatusChart from "./charts/BooksStatusChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    user?.role === "admin" &&
      dispatch(getAllUserAction()) &&
      dispatch(fetchBurrowsAction()) &&
      dispatch(fetchReviewsAction()) &&
      dispatch(getAllBooksAction());
  }, [user?.role, dispatch]);

  return (
    <UserLayout title="Dashboard">
      <Container fluid className="contentHeight">
        <Row className="">
          <Col lg={12} xxl={6} className="">
            <BooksHistoryChart
              toolTips={
                <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
              }
            />
          </Col>

          <Col lg={12} xxl={6} className="">
            <BooksChart
              toolTips={
                <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
              }
            />
          </Col>
        </Row>

        {user?.role === "admin" && (
          <Row className="mt-3">
            <Col lg={12} xxl={6} className="">
              <div className="pieChart">
                <BooksStatusChart />
              </div>
            </Col>

            <Col lg={12} xxl={6} className="">
              <RolesChart
                toolTips={
                  <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
                }
              />
            </Col>
          </Row>
        )}
      </Container>
    </UserLayout>
  );
};

export default Dashboard;
