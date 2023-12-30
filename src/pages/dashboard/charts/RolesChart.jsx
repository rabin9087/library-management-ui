import React from "react";
import { Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const RolesChart = ({toolTips}) => {
  const { allUsers } = useSelector((state) => state.userInfo);
  const admins = allUsers.filter((item) => item.role === "admin");
  const students = allUsers.filter((item) => item.role === "student");
  const users = [
    { roles: "Users Role", Admins: admins.length, Students: students.length },
  ];
  return (
    <ResponsiveContainer width="90%" aspect={2} className="ps-3">
      <BarChart width={"30%"} data={users}>
        <CartesianGrid strokeDasharray={"3 3"} />
        {toolTips}
        <Legend />
        <XAxis dataKey={"roles"} interval={"preserveStartEnd"} />
        <YAxis />
        <Bar dataKey="Admins" stroke="green" fill="green" />
        <Bar dataKey="Students" stroke="green" fill="blue" />
        {/* <Bar dataKey="role" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RolesChart;
