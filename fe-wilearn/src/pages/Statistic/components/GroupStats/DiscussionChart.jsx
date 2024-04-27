import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const DiscussionChart = () => {
  const { moreGroupStats } = useSelector((state) => state.studyGroup);

  const data = [];
  if (moreGroupStats) {
    // const statsData = moreUserStats;
    // const invertedData = statsData.reverse();
    moreGroupStats
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
      <Typography variant="h5">
        Discussion and Answer Chart
      </Typography>
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
