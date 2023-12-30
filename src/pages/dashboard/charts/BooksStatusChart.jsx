import React from "react";
import { Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const BooksStatusChart = ({ toolTips }) => {
  const { burrows } = useSelector((state) => state.burrowInfo);
  const { books } = useSelector((state) => state.bookInfo);
  const activeBooks = books.filter((item) => item.status === "active");
  const inActiveBooks = books.filter((item) => item.status === "inactive");

  const bookStatus = [
    // { status: "Available", "Number Of Books": books.length },
    { status: "Active", "Number Of Books": activeBooks.length },
    { status: "InActive", "Number Of Books": inActiveBooks.length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" aspect={2} className="ps-3">
      <PieChart>
        <Pie
          dataKey={"Number Of Books"}
          data={bookStatus}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          isAnimationActive={true}
        >
          {bookStatus.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {toolTips}
      </PieChart>
      {/* <LineChart data={bookStatus}>
        <Line type={"monotone"} dataKey="Number Of Books" stroke="green" />
        {toolTips}
        <Legend />
        <CartesianGrid strokeDasharray={"2 2"} />
        <XAxis dataKey={"status"} interval={"preserveStartEnd"} />
        <YAxis dataKey={"Number Of Books"} />
      </LineChart> */}
    </ResponsiveContainer>
  );
};

export default BooksStatusChart;
