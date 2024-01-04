import React from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const BooksChart = ({ toolTips }) => {
  const { reviews } = useSelector((state) => state.bookInfo);
  const activeReviews = reviews.filter((item) => item.status === "active");
  const inActiveReviews = reviews.filter((item) => item.status === "inactive");

  const reviewsStatus = [
    {
      status: "Number of Reviews",
      "Reviews Status": reviews.length,
    },
    {
      status: "Active Reviews",
      "Reviews Status": activeReviews.length,
    },
    {
      status: "InActive Reviews",
      "Reviews Status": inActiveReviews.length,
    },
  ];

  return (
    <ResponsiveContainer width="90%" aspect={2} className="ps-3">
      <LineChart data={reviewsStatus}>
        {toolTips}
        {/* <Tooltip /> */}
        <Legend />
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey={"status"} interval={"preserveStartEnd"} />
        <YAxis />
        <Line type={"bump"} dataKey="Reviews Status" stroke="blue" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BooksChart;
