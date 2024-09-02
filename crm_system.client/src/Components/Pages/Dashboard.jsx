// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Report from "./Report";
// import "./Dashboard.css";
// import Swal from "sweetalert2";
// import CustomerList from "../CrudOperation/CustomerList";
// import AddCustomerDetails from "../CrudOperation/CreateCustomer";
// import Profile from "./Profile";
// import GenerateReport from "../CrudOperation/GenerateReport";
// import UpdateCustomerDetails from "../CrudOperation/UpdateCustomer";
// import DeleteCustomerDetails from "../CrudOperation/DeleteCustomer";
// import UserList from "../CrudOperation/UserList";
// import DeleteUser from "../CrudOperation/DeleteUser";
// import InteractionUser from "../CrudOperation/InteractionUser";
// import UserActivity from '../CrudOperation/UserActivity'
// const Dashboard = () => {

//   const [access, setAccess] = useState(false);
//   const [activePage, setActivePage] = useState("report");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const [reportGenerated, setReportGenerated] = useState(false);

//   const handleReportGenerated = () => {
//     setReportGenerated(true);
//   };

//   useEffect(() => {
//     handleAccessByRole();
//   }, []);

//   const handleAccessByRole = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const role = user.role;
//     if (role !== "admin" && role !== "sales_manager") {
//       setAccess(false);
//     } else {
//       setAccess(true);
//     }
//   };

//   const handleNavigation = (page) => {
//     if (!access && (page === "delete" || page === "generateReport")) {
//       Swal.fire({
//         title: "Oops! Permission denied",
//         text: "Contact admin or sales representative.",
//         icon: "error",
//       });
//       return;
//     }

//     setActivePage(page);
//     setIsSidebarOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     Swal.fire({
//       title: "Logout success",
//       text: "Redirecting to Home Page...",
//       icon: "success",
//       // showConfirmButton:true
//     })
//     navigate("/");
//   };

//   const toggleDropdown = (dropdown) => {
//     if (dropdown === "user") {
//       setIsUserDropdownOpen(!isUserDropdownOpen);
//       setIsCustomerDropdownOpen(false);
//     } else if (dropdown === "customer") {
//       setIsCustomerDropdownOpen(!isCustomerDropdownOpen);
//       setIsUserDropdownOpen(false);
//     }
//   };

//   return (
//     <div className="container-fluid p-0">
//       <div
//         className={`sidebar ${isSidebarOpen ? "open" : ""}`}
//         style={{ backgroundColor: "#10058C" }}
//       >
//         <div className="sidebar-content d-flex flex-column text-white min-vh-100 p-3">
//           <button
//             className="btn btn-light d-md-none align-self-end mb-3"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <i className="bi bi-x"></i>
//           </button>
//           <a href="/" className="text-white text-decoration-none mb-4">
//             <span className="fs-5">Sales Navigator</span>
//           </a>

//           <ul className="nav flex-column">
//             <NavItem
//               label="Dashboard"
//               icon="bi-speedometer2"
//               onClick={() => handleNavigation("report")}
//             />
//             <NavItem
//               label="Profile"
//               icon="bi-person"
//               onClick={() => handleNavigation("profile")}
//             />

//             {/* User Dropdown */}
//             <li className="nav-item mb-2">
//               <a
//                 href="#"
//                 className="nav-link text-white"
//                 onClick={() => toggleDropdown("user")}
//               >
//                 <i className="bi bi-people me-2"></i>
//                 User
//                 <i
//                   className={`bi ${isUserDropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
//                     } ms-2`}
//                 ></i>
//               </a>
//               {isUserDropdownOpen && (
//                 <ul className="nav flex-column ms-3 show default-bullet " >
//                   <NavItem
//                     className=''
//                     label="User List"
//                     icon="bi-list-ul"
//                     onClick={() => handleNavigation("userList")}
//                   />
//                   {/* <NavItem
//                     label="Delete User"
//                     icon="bi-person-x"
//                     onClick={() => handleNavigation("deleteUser")}
//                   /> */}
//                   <NavItem
//                     label="Generate Report"
//                     icon="bi-clipboard-data"
//                     onClick={() => handleNavigation("generateReport")}
//                   />
//                   <NavItem
//                     label="User Activities"
//                     icon="bi-person-lines-fill"
//                     onClick={() => handleNavigation("userActivity")}
//                   />

//                   {/* <NavItem
//                     label="Interaction"
//                     icon="bi bi-chat-dots"
//                     // href="mailto:example@example.com"
//                     onClick={() => handleNavigation("interaction")}

//                   /> */}
//                 </ul>
//               )}
//             </li>

//             {/* Customer Dropdown */}
//             <li className="nav-item mb-2">
//               <a
//                 href="#"
//                 className="nav-link text-white"
//                 onClick={() => toggleDropdown("customer")}
//               >
//                 <i className="bi bi-people me-2"></i>
//                 Customers
//                 <i
//                   className={`bi ${isCustomerDropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
//                     } ms-2`}
//                 ></i>
//               </a>
//               {isCustomerDropdownOpen && (
//                 <ul className="nav flex-column ms-3 show default-bullet">
//                   <NavItem
//                     label="Customer List"
//                     icon="bi-table"
//                     onClick={() => handleNavigation("customerList")}
//                   />
//                   <NavItem
//                     label="Add Customer"
//                     icon="bi-person-plus"
//                     onClick={() => handleNavigation("add")}
//                   />
//                   <NavItem
//                     label="Update Customer"
//                     icon="bi-pencil-square"
//                     onClick={() => handleNavigation("update")}
//                   />
//                   <NavItem
//                     label="Delete Customer"
//                     icon="bi-person-x"
//                     onClick={() => handleNavigation("delete")}
//                   />
//                   <NavItem
//                     label="Generate Report"
//                     icon="bi-clipboard-data"
//                     onClick={() => handleNavigation("generateReport")}
//                   />
//                   <NavItem
//                     label="Interaction"
//                     icon="bi bi-chat-dots"
//                     // href="mailto:example@example.com"
//                     onClick={() => handleNavigation("interaction")}

//                   />
//                 </ul>
//               )}
//             </li>
//           </ul>

//           <button className="btn btn-info mt-auto" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="main-content">
//         <nav className="navbar navbar-expand-md navbar-light bg-light d-md-none">
//           <div className="container-fluid">
//             <button
//               className="navbar-toggler"
//               type="button"
//               onClick={() => setIsSidebarOpen(true)}
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <a className="navbar-brand" href="#">
//               Sales Navigator
//             </a>
//           </div>
//         </nav>

//         <div className="content p-3">
//           {/* Customer management.... */}

//           {activePage === "profile" && <Profile />}
//           {activePage === "report" && <Report />}
//           {activePage === "customerList" && <CustomerList />}
//           {activePage === "generateReport" && <GenerateReport />}
//           {activePage === "add" && <AddCustomerDetails />}

//           {activePage === "delete" && <DeleteCustomerDetails />}
//           {activePage === "update" && <UpdateCustomerDetails />}

//           {/* User management.... */}
//           {activePage === "userList" && <UserList />}
//           {activePage === "interaction" && <InteractionUser />}
//           {activePage === "deleteUser" && <DeleteUser />}
//           {activePage === "userActivity" && <UserActivity />}
//         </div>
//       </div>
//     </div>
//   );
// };

// const NavItem = ({ label, icon, onClick, href }) => (
//   <li className="nav-item mb-2">
//     <a
//       href="#"
//       className="nav-link text-white"
//       onClick={onClick}
//     >
//       <i className={`bi ${icon} me-2`}></i>
//       {label}
//     </a>
//   </li>
// );

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Report from "./Report";
import "./Dashboard.css";
import Swal from "sweetalert2";
import CustomerList from "../CrudOperation/CustomerList";
import AddCustomerDetails from "../CrudOperation/CreateCustomer";
import Profile from "./Profile";
import GenerateReport from "../CrudOperation/GenerateReport";
import UpdateCustomerDetails from "../CrudOperation/UpdateCustomer";
import DeleteCustomerDetails from "../CrudOperation/DeleteCustomer";
import UserList from "../CrudOperation/UserList";
import DeleteUser from "../CrudOperation/DeleteUser";
import InteractionUser from "../CrudOperation/InteractionUser";
import UserActivity from "../CrudOperation/UserActivity";

const Dashboard = () => {
  const [access, setAccess] = useState(false);
  const [activePage, setActivePage] = useState("report");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleAccessByRole();
  }, []);

  const handleAccessByRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    setAccess(role === "admin");
  };

  const handleNavigation = (page) => {
    if (!access && (page === "deleteUser" || page === "generateReport")) {
      Swal.fire({
        title: "Oops! Permission denied",
        text: "Contact admin or sales manager.",
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
    Swal.fire({
      title: "Logout success",
      text: "Redirecting to Home Page...",
      icon: "success",
    }).then(() => {
      navigate("/");
    });
  };

  const toggleDropdown = (dropdown) => {
    if (dropdown === "user") {
      setIsUserDropdownOpen(!isUserDropdownOpen);
      setIsCustomerDropdownOpen(false);
    } else if (dropdown === "customer") {
      setIsCustomerDropdownOpen(!isCustomerDropdownOpen);
      setIsUserDropdownOpen(false);
    }
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

            {/* User Dropdown */}
            {access && (
              <li className="nav-item mb-2">
                <a
                  href="#"
                  className="nav-link text-white"
                  onClick={() => toggleDropdown("user")}
                >
                  <i className="bi bi-people me-2"></i>
                  User
                  <i
                    className={`bi ${
                      isUserDropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
                    } ms-2`}
                  ></i>
                </a>
                {isUserDropdownOpen && (
                  <ul className="nav flex-column ms-3 show default-bullet">
                    <NavItem
                      label="User List"
                      icon="bi-list-ul"
                      onClick={() => handleNavigation("userList")}
                    />
                    {/* <NavItem
                      label="Generate Report"
                      icon="bi-clipboard-data"
                      onClick={() => handleNavigation("generateReport")}
                    /> */}
                    <NavItem
                      label="User Activities"
                      icon="bi-person-lines-fill"
                      onClick={() => handleNavigation("userActivity")}
                    />
                  </ul>
                )}
              </li>
            )}

            {/* Customer Dropdown */}
            <li className="nav-item mb-2">
              <a
                href="#"
                className="nav-link text-white"
                onClick={() => toggleDropdown("customer")}
              >
                <i className="bi bi-people me-2"></i>
                Customers
                <i
                  className={`bi ${
                    isCustomerDropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
                  } ms-2`}
                ></i>
              </a>
              {isCustomerDropdownOpen && (
                <ul className="nav flex-column ms-3 show default-bullet">
                  <NavItem
                    label="Customer List"
                    icon="bi-table"
                    onClick={() => handleNavigation("customerList")}
                  />
                  <NavItem
                    label="Add Customer"
                    icon="bi-person-plus"
                    onClick={() => handleNavigation("add")}
                  />
                  <NavItem
                    label="Update Customer"
                    icon="bi-pencil-square"
                    onClick={() => handleNavigation("update")}
                  />
                  <NavItem
                    label="Delete Customer"
                    icon="bi-person-x"
                    onClick={() => handleNavigation("delete")}
                  />
                  <NavItem
                    label="Generate Report"
                    icon="bi-clipboard-data"
                    onClick={() => handleNavigation("generateReport")}
                  />
                  <NavItem
                    label="Interaction"
                    icon="bi bi-chat-dots"
                    onClick={() => handleNavigation("interaction")}
                  />
                </ul>
              )}
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
          {activePage === "userList" && <UserList />}
          {activePage === "interaction" && <InteractionUser />}
          {activePage === "deleteUser" && <DeleteUser />}
          {activePage === "userActivity" && <UserActivity />}
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
