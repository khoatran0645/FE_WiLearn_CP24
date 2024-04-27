import { Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ChartMeeting = () => {
  const { moreUserStats } = useSelector((state) => state.user);
  // console.log("moreUserStats", moreUserStats);

  let months = [];
  let attendedMeetings = [];
  let absentMeetings = [];
  let totalMeetings = [];

  if (moreUserStats) {
    moreUserStats
      .slice()
      .reverse()
      .forEach((stats) => {
        months.push(dayjs(stats.month).format("MMMM YYYY"));
        attendedMeetings.push(stats.atendedMeetingsCount);
        absentMeetings.push(stats.missedMeetingsCount);
        totalMeetings.push(stats.totalMeetingsCount);
      });
  }
  // console.log("absentMeetings", absentMeetings);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Total Meetings",
        data: totalMeetings,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Attended Meetings",
        data: attendedMeetings,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Absent Meetings",
        data: absentMeetings,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };


  const options = {
    responsive: true,
    scales: {
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Grid style={{ maxWidth: "800px", marginLeft: "200px" }}>
      <Typography variant="h5">Number of meetings</Typography>
      <Bar data={data} options={options} />
    </Grid>
  );
};

export default ChartMeeting;
