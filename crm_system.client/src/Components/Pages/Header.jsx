import React from "react";

const Header = () => {
  return (
    <header
      id="header"
      className="header d-flex align-items-center fixed-top"
      style={{ backgroundColor: "#10058C" }}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="images/crm.png" style={{ borderRadius: "6px" }} alt="..." />
          <h1 className="sitename">Sales Navigator</h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <a href="#hero" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
