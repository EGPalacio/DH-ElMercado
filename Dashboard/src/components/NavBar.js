import React from 'react';
const logoElMercado  = require ('../assets/images/logo-elMercado-v2.png');

function NavBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <h1 className="h3 mb-0 text-gray-800 ">App Dashboard</h1>

      {/* <!-- Sidebar Toggle (Topbar) --> */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none mr-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto">

       

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* <!-- Nav Item - User Information --> */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
            <span className="mr-2 d-none d-lg-inline text-gray-600">El Mercado</span>
            <img className="img-profile rounded-circle" src={logoElMercado} alt="Walter" width="60" />
          </a>
        </li>

      </ul>

    </nav>
    
  );
}

export default NavBar;