import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const GenerateReport = () => {
  const [reportType, setReportType] = useState("Sales Activities");
  const [reportData, setReportData] = useState({
    startDate: "",
    endDate: "",
    salesData: {
      sales: 0,
      support: 0,
      success: 0,
      issues: 0
    },
    additionalNotes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchReportData();
  }, [reportType]);

  const fetchReportData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('token');

    if (!user?.userId || !token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'User not authenticated. Please log in.',
      });
      return;
    }

    try {
      const response = await axios.get(`https://localhost:7192/api/Reports/GetReportData`, {
        params: {
          reportType: reportType,
          startDate: reportData.startDate,
          endDate: reportData.endDate
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        const data = response.data;
        if (reportType === "Sales Activities") {
          setChartData({
            labels: ['Sales', 'Support', 'Success', 'Issues'],
            datasets: [{
              data: [data.sales, data.support, data.success, data.issues],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            }]
          });
        } else {
          // Assuming the API returns customer data in a suitable format
          setChartData({
            labels: data.map(item => item.date),
            datasets: [{
              label: 'New Customers',
              data: data.map(item => item.newCustomers),
              backgroundColor: '#36A2EB',
            }]
          });
        }
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Failed to fetch report data.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("salesData.")) {
      const salesDataField = name.split(".")[1];
      setReportData(prevData => ({
        ...prevData,
        salesData: {
          ...prevData.salesData,
          [salesDataField]: parseInt(value, 10) || 0
        }
      }));
    } else {
      setReportData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('token');
    const userId = user?.userId;

    if (!userId || !token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'User not authenticated. Please log in.',
      });
      setIsLoading(false);
      return;
    }

    try {
      if (reportType !== "Customer Data" && reportType !== "Sales Activities") {
        throw new Error("Invalid report type");
      }

      const reportDataToSend = {
        startDate: reportData.startDate,
        endDate: reportData.endDate,
        salesData: reportType === "Sales Activities" ? reportData.salesData : null,
        additionalNotes: reportData.additionalNotes
      };

      const response = await axios.post("https://localhost:7192/api/Reports", {
        userId: userId,
        reportType: reportType,
        reportData: JSON.stringify(reportDataToSend)
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Report generated and stored successfully!',
        });

        fetchReportData();

        setReportType("Sales Activities");
        setReportData({
          startDate: "",
          endDate: "",
          salesData: { sales: 0, support: 0, success: 0, issues: 0 },
          additionalNotes: ""
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || error.message || "Failed to generate and store report.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Generate Report</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (existing form fields) ... */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Report"}
        </button>
      </form>

      {chartData && (
        <div className="mt-5">
          <h3>Report Visualization</h3>
          {reportType === "Sales Activities" ? (
            <Pie data={chartData} />
          ) : (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GenerateReport;