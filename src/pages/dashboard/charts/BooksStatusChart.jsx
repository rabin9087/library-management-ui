import React from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ResponsiveContainer } from "recharts";

ChartJS.register(ArcElement, Tooltip, Legend);
const BooksStatusChart = ({ toolTips }) => {
  const { books } = useSelector((state) => state.bookInfo);
  const activeBooks = books.filter((item) => item.status === "active");
  const inActiveBooks = books.filter((item) => item.status === "inactive");
  const bookStatus = [
    // { status: "Available", "Number Of Books": books.length },
    { status: "Active Books", Number: activeBooks.length },
    { status: "InActive Books", Number: inActiveBooks.length },
  ];

  const data = {
    labels: bookStatus.map((status) => status.status),
    datasets: [
      {
        label: "Number of books",
        data: bookStatus.map((status) => status.Number),
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Chart.js Pie Chart",
      },
    },
  };

  return (
    <ResponsiveContainer width="50%" aspect={2} className="ps-3 ">
      <Pie data={data} options={options} />;
    </ResponsiveContainer>
  );
};

export default BooksStatusChart;
