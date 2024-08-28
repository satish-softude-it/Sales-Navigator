// import React, { useState } from "react";
// import axios from "axios";

// const GenerateReport = () => {
//   const [reportType, setReportType] = useState("Customer Data");
//   const [reportData, setReportData] = useState({
//     startDate: "",
//     endDate: "",
//     additionalNotes: ""
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [alert, setAlert] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReportData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setAlert(null);

//     const userId = JSON.parse(localStorage.getItem("user"))?.UserID;

//     if (!userId) {
//       setAlert({ type: "danger", message: "User not authenticated. Please log in." });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await axios.post("/api/reports", {
//         UserID: userId,
//         ReportType: reportType,
//         ReportData: JSON.stringify(reportData)
//       });
//       setAlert({ type: "success", message: "Report generated successfully!" });
//       // Reset form
//       setReportType("Customer Data");
//       setReportData({ startDate: "", endDate: "", additionalNotes: "" });
//     } catch (error) {
//       console.error("Error generating report:", error);
//       setAlert({ type: "danger", message: error.response?.data?.message || "Failed to generate report." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Generate Report</h2>
//       {alert && (
//         <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
//           {alert.message}
//           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></button>
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="reportType" className="form-label">Report Type</label>
//           <select
//             id="reportType"
//             className="form-select"
//             value={reportType}
//             onChange={(e) => setReportType(e.target.value)}
//           >
//             <option value="Customer Data">Customer Data</option>
//             <option value="Interaction Logs">Interaction Logs</option>
//             <option value="Sales Activities">Sales Activities</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="startDate" className="form-label">Start Date</label>
//           <input
//             type="date"
//             id="startDate"
//             name="startDate"
//             className="form-control"
//             value={reportData.startDate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="endDate" className="form-label">End Date</label>
//           <input
//             type="date"
//             id="endDate"
//             name="endDate"
//             className="form-control"
//             value={reportData.endDate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="additionalNotes" className="form-label">Additional Notes</label>
//           <textarea
//             id="additionalNotes"
//             name="additionalNotes"
//             className="form-control"
//             rows="4"
//             placeholder="Any additional information for the report..."
//             value={reportData.additionalNotes}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           disabled={isLoading}
//         >
//           {isLoading ? "Generating..." : "Generate Report"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GenerateReport;

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GenerateReport = ({ onReportGenerated }) => {
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

    const userId = JSON.parse(localStorage.getItem("user"))?.UserID;

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'User not authenticated. Please log in.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://localhost:7192/api/reports", {
        UserID: userId,
        ReportType: reportType,
        ReportData: JSON.stringify(reportData)
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Report generated successfully!',
      });

      onReportGenerated(reportData.salesData);

      // Reset form
      setReportType("Sales Activities");
      setReportData({
        startDate: "",
        endDate: "",
        salesData: { sales: 0, support: 0, success: 0, issues: 0 },
        additionalNotes: ""
      });
    } catch (error) {
      console.error("Error generating report:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || "Failed to generate report.",
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
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="form-control"
            value={reportData.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="form-control"
            value={reportData.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sales Data</label>
          <div className="row">
            <div className="col-md-3">
              <input
                type="number"
                name="salesData.sales"
                className="form-control"
                placeholder="Sales"
                value={reportData.salesData.sales}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="salesData.support"
                className="form-control"
                placeholder="Support"
                value={reportData.salesData.support}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="salesData.success"
                className="form-control"
                placeholder="Success"
                value={reportData.salesData.success}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="salesData.issues"
                className="form-control"
                placeholder="Issues"
                value={reportData.salesData.issues}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="additionalNotes" className="form-label">Additional Notes</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            className="form-control"
            rows="4"
            placeholder="Any additional information for the report..."
            value={reportData.additionalNotes}
            onChange={handleInputChange}
          ></textarea>
        </div>
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