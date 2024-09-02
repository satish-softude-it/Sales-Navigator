import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GenerateReport = () => {
  const [reportType, setReportType] = useState("Sales Activities");
  const [reportData, setReportData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData(prevData => ({
      ...prevData,
      [name]: parseInt(value, 10) || 0
    }));
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

      const response = await axios.post("https://localhost:7192/api/Reports", {
        userId: userId,
        reportType: reportType,
        reportData: JSON.stringify(reportData)
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Report generated and stored successfully!',
        });
        // Reset form after successful submission
        setReportType("Sales Activities");
        setReportData({});
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
        <div className="mb-3">
          <label htmlFor="reportType" className="form-label">Report Type</label>
          <select
            id="reportType"
            className="form-select"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="Sales Activities">Sales Activities</option>
            <option value="Customer Data">Customer Data</option>
          </select>
        </div>

        {reportType === "Sales Activities" && (
          <>
            <div className="mb-3">
              <label htmlFor="sales" className="form-label">Sales</label>
              <input
                type="number"
                id="sales"
                name="sales"
                className="form-control"
                value={reportData.sales || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="support" className="form-label">Support</label>
              <input
                type="number"
                id="support"
                name="support"
                className="form-control"
                value={reportData.support || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="success" className="form-label">Success</label>
              <input
                type="number"
                id="success"
                name="success"
                className="form-control"
                value={reportData.success || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="issues" className="form-label">Issues</label>
              <input
                type="number"
                id="issues"
                name="issues"
                className="form-control"
                value={reportData.issues || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        {reportType === "Customer Data" && (
          <>
            <div className="mb-3">
              <label htmlFor="newCustomers" className="form-label">New Customers</label>
              <input
                type="number"
                id="newCustomers"
                name="newCustomers"
                className="form-control"
                value={reportData.newCustomers || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="totalCustomers" className="form-label">Total Customers</label>
              <input
                type="number"
                id="totalCustomers"
                name="totalCustomers"
                className="form-control"
                value={reportData.totalCustomers || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Report"}
        </button>
      </form>
    </div>
  );
};

export default GenerateReport;
