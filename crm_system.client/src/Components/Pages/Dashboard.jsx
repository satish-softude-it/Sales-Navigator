import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import CustomerList from "./CustomerList";
import Report from "./Report";
import "./Dashboard.css";
import DeleteCustomerDetails from "../CrudOperation/Delete";
import UpdateCustomerDetails from "../CrudOperation/Update";
import AddCustomerDetails from "../CrudOperation/Create";
import Swal from "sweetalert2";
import GenerateReport from "../CrudOperation/GenerateReport";

const Dashboard = () => {
  const [access, setAccess] = useState(false);
  const [activePage, setActivePage] = useState("report");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [reportGenerated, setReportGenerated] = useState(false);

  const handleReportGenerated = () => {
    setReportGenerated(true);
  };
  
  useEffect(() => {
    handleAccessByRole();
  }, []);

  const handleAccessByRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;
    if (role !== "admin" && role !== "sales_manager") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  };

  const handleNavigation = (page) => {
    if (!access && (page === "delete" || page === "generateReport")) {
      // alert("Permission denied. Contact admin or sales representative.");
      Swal.fire({
        title: "Oops! Permission denied",
        text: "Contact admin or sales representative.",
        icon: "error",
      });
      return;
    }

    setActivePage(page);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container-fluid p-0">
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{ backgroundColor: "#10058C" }}
      >
        <div className="sidebar-content d-flex flex-column text-white min-vh-100 p-3">
          <button
            className="btn btn-light d-md-none align-self-end mb-3"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="bi bi-x"></i>
          </button>
          <a href="/" className="text-white text-decoration-none mb-4">
            <span className="fs-5">Sales Navigator</span>
          </a>

          <ul className="nav flex-column">
            <NavItem
              label="Dashboard"
              icon="bi-speedometer2"
              onClick={() => handleNavigation("report")}
            />
            <NavItem
              label="Profile"
              icon="bi-person"
              onClick={() => handleNavigation("profile")}
            />

            <li className="nav-item mb-2">
              <a
                href="#"
                className="nav-link text-white"
                data-bs-toggle="collapse"
                data-bs-target="#functionalitySubmenu"
              >
                <i className="bi bi-grid me-2"></i>
                Functionality
              </a>
              <ul
                className="nav flex-column ms-3 show default-bullet"
                id="functionalitySubmenu"
              >
                <NavItem
                  label="Add Customer"
                  icon="bi-person-plus"
                  onClick={() => handleNavigation("add")}
                />
                <NavItem
                  label="Delete Customer"
                  icon="bi-person-x"
                  onClick={() => handleNavigation("delete")}
                />
                <NavItem
                  label="Update Customer"
                  icon="bi-pencil-square"
                  onClick={() => handleNavigation("update")}
                />
                <NavItem
                  label="Customer List"
                  icon="bi-table"
                  onClick={() => handleNavigation("customerList")}
                />
                <NavItem
                  label="Generate Report"
                  icon="bi-clipboard-data"
                  onClick={() => handleNavigation("generateReport")}
                />
                <NavItem
                  label="Interaction"
                  icon="bi bi-chat-dots"
                  // onClick={() => }
                  href="mailto:example@example.com"
                />
              </ul>
            </li>
          </ul>

          <button className="btn btn-info mt-auto" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <nav className="navbar navbar-expand-md navbar-light bg-light d-md-none">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">
              Sales Navigator
            </a>
          </div>
        </nav>


        <div className="content p-3">
          {activePage === "profile" && <Profile />}
          {activePage === "report" && <Report />}
          {activePage === "customerList" && <CustomerList />}
          {activePage === "generateReport" && <GenerateReport />}
          {activePage === "add" && <AddCustomerDetails />}
          {activePage === "delete" && <DeleteCustomerDetails />}
          {activePage === "update" && <UpdateCustomerDetails />}
        </div>
      </div>
    </div>
  );
};

const mailtoLink = (label) => {
  if (label === "Interaction") {
    const to = "satish.vishwakarma.it@gmail.com";
    const subject = encodeURIComponent("Interaction Request");
    const body = encodeURIComponent("Hello,\n\nI would like to discuss an interaction.\n\nThank you!");
    
    // Construct the Gmail compose link
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
  }
  return "#";
};

const NavItem = ({ label, icon, onClick }) => (
  <li className="nav-item mb-2">
    <a
      href={mailtoLink(label)}
      className="nav-link text-white"
      onClick={onClick}
    >
      <i className={`bi ${icon} me-2`}></i>
      {label}
    </a>
  </li>
);

export default Dashboard;
