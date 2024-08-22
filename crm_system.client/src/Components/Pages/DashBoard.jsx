import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>
      <div className="navbar-nav ml-auto">
        <a className="nav-item nav-link" href="#!">Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;
