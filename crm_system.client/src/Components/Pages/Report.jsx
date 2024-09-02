import React, { useState, useEffect } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const CRMReport = () => {
  const [salesData, setSalesData] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const salesResponse = await fetch('/api/reports/sales');
        const salesJson = await salesResponse.json();
        setSalesData(salesJson);

        const customerResponse = await fetch('/api/reports/customers');
        const customerJson = await customerResponse.json();
        setCustomerData(customerJson);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!salesData || !customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">CRM System Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SalesActivityChart data={salesData} />
        </div>
        <div>
          <CustomerDistributionChart data={customerData} />
        </div>
        <div>
          <SalesPerformanceChart data={salesData} />
        </div>
        <div>
          <CustomerGrowthChart data={customerData} />
        </div>
      </div>
    </div>
  );
};

const SalesActivityChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [{
      label: 'Sales Activities',
      data: data.map(item => item.activityCount),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Sales Activities</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Activities'
              }
            }
          }
        }}
      />
    </div>
  );
};

const CustomerDistributionChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.state),
    datasets: [{
      data: data.map(item => item.customerCount),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    }]
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Customer Distribution by State</h2>
      <Pie data={chartData} />
    </div>
  );
};

const SalesPerformanceChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.salesperson),
    datasets: [{
      label: 'Sales Performance',
      data: data.map(item => item.salesAmount),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Sales Performance</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Sales Amount ($)'
              }
            }
          }
        }}
      />
    </div>
  );
};

const CustomerGrowthChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [{
      label: 'New Customers',
      data: data.map(item => item.newCustomers),
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
      fill: false
    }]
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Customer Growth</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of New Customers'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default CRMReport;