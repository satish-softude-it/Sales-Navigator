import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GenerateReport = () => {
  const [reportType, setReportType] = useState("Sales Activities");
  const [reportData, setReportData] = useState({
    sales: "",
    support: "",
    success: "",
    issues: "",
    newCustomers: "",
    totalCustomers: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const requiredFields = reportType === "Sales Activities"
      ? ["sales", "support", "success", "issues"]
      : ["newCustomers", "totalCustomers"];

    for (let field of requiredFields) {
      if (!reportData[field] || isNaN(reportData[field])) {
        return `Please enter a valid number for ${field.replace(/([A-Z])/g, ' $1')}.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userId = user?.userId;

    if (!userId || !token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "User not authenticated. Please log in.",
      });
      setIsLoading(false);
      return;
    }

    const validationError = validateInputs();
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validationError,
      });
      setIsLoading(false);
      return;
    }

    try {
      if (reportType !== "Customer Data" && reportType !== "Sales Activities") {
        throw new Error("Invalid report type");
      }

      const response = await axios.post(
        "https://localhost:7192/api/Reports",
        {
          userId: userId,
          reportType: reportType,
          reportData: JSON.stringify(reportData),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Report generated and stored successfully!",
        });
        setReportType("Sales Activities");
        setReportData({
          sales: "",
          support: "",
          success: "",
          issues: "",
          newCustomers: "",
          totalCustomers: ""
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to generate and store report.",
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
          <label htmlFor="reportType" className="form-label">
            Report Type
          </label>
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
              <label htmlFor="sales" className="form-label">
                Sales
              </label>
              <input
                type="number"
                id="sales"
                name="sales"
                className="form-control"
                placeholder="Enter sales number"
                value={reportData.sales}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="support" className="form-label">
                Support
              </label>
              <input
                type="number"
                id="support"
                name="support"
                className="form-control"
                placeholder="Enter support number"
                value={reportData.support}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="success" className="form-label">
                Success
              </label>
              <input
                type="number"
                id="success"
                name="success"
                className="form-control"
                placeholder="Enter success number"
                value={reportData.success}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="issues" className="form-label">
                Issues
              </label>
              <input
                type="number"
                id="issues"
                name="issues"
                className="form-control"
                placeholder="Enter issues number"
                value={reportData.issues}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </>
        )}

        {reportType === "Customer Data" && (
          <>
            <div className="mb-3">
              <label htmlFor="newCustomers" className="form-label">
                New Customers
              </label>
              <input
                type="number"
                id="newCustomers"
                name="newCustomers"
                className="form-control"
                placeholder="Enter new customers number"
                value={reportData.newCustomers}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="totalCustomers" className="form-label">
                Total Customers
              </label>
              <input
                type="number"
                id="totalCustomers"
                name="totalCustomers"
                className="form-control"
                placeholder="Enter total customers number"
                value={reportData.totalCustomers}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Report"}
        </button>
      </form>
    </div>
  );
};

export default GenerateReport;
