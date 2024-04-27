import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Grid, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const HoursChart = () => {
  const { moreGroupStats } = useSelector((state) => state.studyGroup);

  const data = [];
  if (moreGroupStats) {
    moreGroupStats
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

  const chartData = {
    labels: data.map(row => row.month),
    datasets: [
      {
        label: 'Hours',
        data: data.map(row => row.count),
        backgroundColor: 'rgba(236, 171, 83, 0.2)',
        borderColor: '#ECAB53',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: data.map(row => row.month),
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  return (
    <Grid style={{maxWidth:'800px', marginLeft:'200px'}}>
      <Typography variant='h5'>Meeting Hours Chart</Typography>
      <Line data={chartData} options={chartOptions} />
    </Grid>
  );
};

export default HoursChart;
