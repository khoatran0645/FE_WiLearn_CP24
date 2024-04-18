import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Grid, Typography } from '@mui/material';

const HoursChart = () => {
  const data = [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 2 },
    { month: 'Apr', count: 5 },
    { month: 'May', count: 3 },
    { month: 'Jun', count: 1 },
    { month: 'Jul', count: 0 },
    { month: 'Aug', count: 4 },
    { month: 'Sep', count: 2 },
  ];

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
