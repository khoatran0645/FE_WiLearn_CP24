import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ChartMeeting = () => {
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
        backgroundColor: '#ECAB53',
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
    <div style={{maxWidth:'800px', marginLeft:'200px'}}>
      <h1>Meeting Hours Chart</h1>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartMeeting;

