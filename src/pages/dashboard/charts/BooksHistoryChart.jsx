import React from 'react'
import { Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const BooksHistoryChart = ({toolTips}) => {
    const { burrows } = useSelector((state) => state.burrowInfo);
    const returned = burrows.filter((item) => item.isReturned === true);
    const notReturned = burrows.filter((item) => item.isReturned === false);
   
    const burrowsBooks = [
      {
        name: "My Books History",
        Burrowed: burrows.length,
        Returned: returned.length,
        NotReturned: notReturned.length,
      },
    ];

  return (
    <ResponsiveContainer width="90%" aspect={2} className="ps-3">
    <BarChart width={"30%"} data={burrowsBooks}>
      {/* <CartesianGrid strokeDasharray={"5 5"} /> */}
      {toolTips}
      <Legend />
      <XAxis dataKey={"name"} interval={"preserveStartEnd"} />
      <YAxis />
      <Bar dataKey="Burrowed" stroke="red" fill="blue" />
      <Bar dataKey="Returned" stroke="red" fill="green" />
      <Bar dataKey="NotReturned" stroke="red" fill="red" />
      {/* <Bar dataKey="role" fill="#82ca9d" /> */}
    </BarChart>
  </ResponsiveContainer>
  )
}

export default BooksHistoryChart
