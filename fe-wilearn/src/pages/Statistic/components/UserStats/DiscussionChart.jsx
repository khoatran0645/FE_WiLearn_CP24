import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
// const data = [
//   { month: "Jan", "Total Discussion": 4, "Total Answer": 24 },
//   { month: "Feb", "Total Discussion": 3, "Total Answer": 45 },
//   { month: "Mar", "Total Discussion": 11, "Total Answer": 13 },
//   { month: "Apr", "Total Discussion": 1, "Total Answer": 9 },
//   { month: "May", "Total Discussion": 8, "Total Answer": 39 },
//   { month: "Jun", "Total Discussion": 18, "Total Answer": 48 },
//   { month: "Jul", "Total Discussion": 23, "Total Answer": 38 },
//   { month: "Aug", "Total Discussion": 9, "Total Answer": 43 },
//   { month: "Sep", "Total Discussion": 15, "Total Answer": 24 },
//   { month: "Oct", "Total Discussion": 10, "Total Answer": 45 },
//   { month: "Nov", "Total Discussion": 6, "Total Answer": 13 },
//   { month: "Dec", "Total Discussion": 16, "Total Answer": 11 },
// ];

const DiscussionChart = () => {
  const { moreUserStats } = useSelector((state) => state.user);

  // console.log("moreUserStats", moreUserStats);

  const data = [];
  if (moreUserStats) {
    // const statsData = moreUserStats;
    // const invertedData = statsData.reverse();
    moreUserStats
      .slice()
      .reverse()
      .forEach((stats) => {
        data.push({
          month: dayjs(stats.month).format("MMMM YYYY"),
          "Total Discussion": stats.totalDiscussionCount,
          "Total Answer": stats.toTalAnswerDiscussionCount,
        });
      });
  }
  return (
    <Container>
      <Typography variant="h5">Discussion and Answer Chart</Typography>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total Discussion" fill="#8884d8" />
        <Bar dataKey="Total Answer" fill="#82ca9d" />
      </BarChart>
    </Container>
  );
};

export default DiscussionChart;
