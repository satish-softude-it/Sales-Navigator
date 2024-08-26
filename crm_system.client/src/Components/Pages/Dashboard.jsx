import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import CustomerList from "./CustomerList";
import Report from "./Report";
import "./Dashboard.css";
import DeleteCustomerDetails from "../CrudOperation/Delete";
import UpdateCustomerDetails from "../CrudOperation/Update";
import AddCustomerDetails from "../CrudOperation/Create";

const Dashboard = () => {
  const [activePage, setActivePage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (page) => {
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
            <NavItem
              label="Customer List"
              icon="bi-table"
              onClick={() => handleNavigation("customerList")}
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
                {["Add", "Delete", "Update", "Read"].map((action) => (
                  <li className="nav-item" key={action}>
                    <a
                      href="#"
                      className="nav-link text-white"
                      onClick={() => handleNavigation(action.toLowerCase())}
                    >
                      {action}
                    </a>
                  </li>
                ))}
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
          {activePage === "customerList" && <CustomerList />}
          {activePage === "report" && <Report />}
          {activePage === "add" && <AddCustomerDetails />}{" "}
          {activePage === "delete" && <DeleteCustomerDetails />}
          {activePage === "update" && <UpdateCustomerDetails />}
          {/* {activePage === "read" && <ReadCustomerDetails />}{" "} */}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ label, icon, onClick }) => (
  <li className="nav-item mb-2">
    <a href="#" className="nav-link text-white" onClick={onClick}>
      <i className={`bi ${icon} me-2`}></i>
      {label}
    </a>
  </li>
);

export default Dashboard;
