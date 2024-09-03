import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend);

const CRMReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const salesResponse = await axios.get('https://localhost:7192/api/Interaction/report', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Sales Data:", salesResponse.data);
        setSalesData(salesResponse.data);

        const customerResponse = await axios.get('https://localhost:7192/api/Customers/distribution', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Customer Data:", customerResponse.data);
        setCustomerData(customerResponse.data);

        const reportResponse = await axios.get('https://localhost:7192/api/Reports/monthlyReport', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Report Data:", reportResponse.data);
        setReportData(reportResponse.data);

        console.log("Data fetched successfully");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!salesData.length || !customerData.length || !reportData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
    <h1 className="text-center my-4">CRM System Report</h1>
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-body">
            <SalesActivityChart data={salesData} />
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card">
          <div className="card-body">
            <SalesPerformanceChart data={reportData} />
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-body">
            <CustomerDistributionChart data={customerData} />
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

const SalesActivityChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = 0;
    }
    acc[item.month] += item.totalInteractions;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [{
      label: 'Sales Activities',
      data: Object.values(aggregatedData),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div >
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
      data: data.map(item => item.totalCustomers),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)',
        'rgba(83, 102, 255, 0.6)',
        'rgba(255, 99, 71, 0.6)',
        'rgba(128, 128, 128, 0.6)'
      ],
    }]
  };

  return (
    <div >
      <h2 className="text-xl font-semibold mb-2">Customer Distribution by State</h2>
      <Pie data={chartData} />
    </div>
  );
};

const SalesPerformanceChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = 0;
    }
    acc[item.month] += item.totalReports;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [{
      label: 'Reports Generated',
      data: Object.values(aggregatedData),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div >
      <h2 className="text-xl font-semibold mb-2">Report Generation Trends</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Reports'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default CRMReport;
