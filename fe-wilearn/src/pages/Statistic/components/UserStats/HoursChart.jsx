import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Grid, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import dayjs from "dayjs";
const HoursChart = () => {
  const { moreUserStats } = useSelector((state) => state.user);
  // console.log("moreUserStats", moreUserStats);

  const data = [];
  if (moreUserStats) {
    moreUserStats
      .slice()
      .reverse()
      .forEach((stats) => {
        const [hoursStr, minutesStr] = stats.totalMeetingTme
          .split(":")
          .slice(0, 2);
        const [hours, minutes] = [
          parseInt(hoursStr, 10),
          parseInt(minutesStr, 10),
        ];
        const totalHours = hours + minutes / 60;
        data.push({
          month: dayjs(stats.month).format("MMMM YYYY"),
          count: totalHours,
        });
      });
  }

  // const data = [
  //   { month: "Jan", count: 1 },
  //   { month: "Feb", count: 0 },
  //   { month: "Mar", count: 2 },
  //   { month: "Apr", count: 5 },
  //   { month: "May", count: 3 },
  //   { month: "Jun", count: 1 },
  //   { month: "Jul", count: 0 },
  //   { month: "Aug", count: 4 },
  //   { month: "Sep", count: 2 },
  // ];

  const chartData = {
    labels: data.map((row) => row.month),
    datasets: [
      {
        label: "Hours",
        data: data.map((row) => row.count),
        backgroundColor: "rgba(236, 171, 83, 0.2)",
        borderColor: "#ECAB53",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: data.map((row) => row.month),
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Hours",
        },
      },
    },
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} style={{ maxWidth: "800px" }}>
        <Typography variant="h5" align="center">Meeting Hours Chart</Typography>
        <Line data={chartData} options={chartOptions} />
      </Grid>
    </Grid>
  );
};

export default HoursChart;
