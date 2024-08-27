import React, { useState } from "react";
import axios from "axios";

const GenerateReport = () => {
  const [reportType, setReportType] = useState("Sales");
  const [reportData, setReportData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user")).UserID;

    try {
      await axios.post("/api/reports", {
        userId,
        reportType,
        reportData,
      });
      alert("Report generated successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report.");
    }
  };

  return (
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
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="reportData" className="form-label">
          Report Data
        </label>
        <textarea
          id="reportData"
          className="form-control"
          rows="5"
          value={reportData}
          onChange={(e) => setReportData(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Generate Report
      </button>
    </form>
  );
};

export default GenerateReport;
