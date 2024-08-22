import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Sales CRM</div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-light">
          Dashboard
        </Link>
        <Link to="/sales-overview" className="list-group-item list-group-item-action bg-light">
          Sales Overview
        </Link>
        <Link to="/customers" className="list-group-item list-group-item-action bg-light">
          Customers
        </Link>
        <Link to="/reports" className="list-group-item list-group-item-action bg-light">
          Reports
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
