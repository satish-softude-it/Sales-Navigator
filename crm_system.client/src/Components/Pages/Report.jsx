import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { CChart } from '@coreui/react-chartjs';
// import { Utils } from 'chart.js/helpers';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6"><BarChart /></div>
        <div className="col-12 col-sm-6 col-md-6"><Chart /></div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6"><PieChart /></div>
        <div className="col-12 col-sm-6 col-md-6">Reports</div>
      </div>
    </div>
  );
};

const Chart = () => (
  <div className="">
    <CChart
      type="doughnut"
      data={{
        labels: ["Sales", "Support", "Success", "Issues"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              color: "#000000", // Set a default color or use any CSS color value
            },
          },
        },
      }}
    />
  </div>
);

const BarChart = () => {
  // Custom function to generate month names for labels
  const getMonthLabels = (count) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.slice(0, count);
  };

  const labels = getMonthLabels(7); // Generate 7 month labels

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div>
      <h2>My Bar Chart</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
              },
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </div>
  );
};



// ChartJS.register(ArcElement, Tooltip, Legend)
const PieChart = () => {
  const data = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [{
      label: 'My First Dataset',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

  return (
    <div>
      <h2>My Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};


export default Report;
