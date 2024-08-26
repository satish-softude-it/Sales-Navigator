import React from 'react'

const Header = () => {
  return (
    <header
        id="header"
        class="header d-flex align-items-center fixed-top"
        style={{ backgroundColor: "#10058C"}}
      >
        <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="/" class="logo d-flex align-items-center">
            <img src="images/crm.png" style={{borderRadius:'6px'}} alt="..." />
            <h1 class="sitename">Sales Navigator</h1>
          </a>

          <nav id="navmenu" class="navmenu">
            <ul>
              <li>
                <a href="#hero" class="active">
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
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

        </div>
      </header>
  )
}

export default Header