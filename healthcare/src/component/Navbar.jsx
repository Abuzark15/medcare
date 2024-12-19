import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../services/authService';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userrole, setUserRole] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open/close
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isAuthenticated() && token) {
      const currentUser = getCurrentUser();
      setIsLoggedIn(true);
      setUsername(currentUser.name);
      setUserRole(currentUser.role);
      setShowLogin(false);
    }
  });

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const handleLoginClick = () => {
    setShowLogin(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setShowLogin(true);
    navigate('/register');
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  // Toggle dropdown visibility manually
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Offcanvas Menu */}
      <div className={`offcanvas-menu-overlay ${isOffcanvasOpen ? 'active' : ''}`} onClick={toggleOffcanvas}></div>
      <div className={`offcanvas-menu-wrapper ${isOffcanvasOpen ? 'active' : ''}`}>
        <div className="offcanvas__logo">
          <Link to="/">
            <img src="img/logo.png" alt="Logo" />
          </Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__btn">
          <Link to="/appointment" className="primary-btn">Appointment</Link>
        </div>
        <ul className="offcanvas__widget">
          <li><i className="fa fa-phone"></i> 1-677-124-44227</li>
          <li><i className="fa fa-map-marker"></i> Los Angeles Gournadi, 1230 Bariasl</li>
          <li><i className="fa fa-clock-o"></i> Mon to Sat 9:00am to 18:00pm</li>
        </ul>
        <div className="offcanvas__social">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
          <a href="#"><i className="fa fa-dribbble"></i></a>
        </div>
      </div>

      {/* Header Section */}
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <ul className="header__top__left">
                  <li><i className="fa fa-phone"></i> 1-677-124-44227</li>
                  <li><i className="fa fa-map-marker"></i> Los Angeles Gournadi, 1230 Bariasl</li>
                  <li><i className="fa fa-clock-o"></i> Mon to Sat 9:00am to 18:00pm</li>
                </ul>
              </div>
              <div className="col-lg-4">
                <div className="header__top__right">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-instagram"></i></a>
                  <a href="#"><i className="fa fa-dribbble"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-4">
              <div className="header__logo">
                <Link to="/">
                  <img src="/img/logo.png" alt="Logo" style={{ width: '100%' }} />
                </Link>
              </div>
            </div>

            <div className="col-lg-5 col-8">
              <div className="header__menu__option">
                <nav className="header__menu">
                  <ul className="list-unstyled d-flex justify-content-center justify-content-lg-start mb-0">
                    <li className="active"><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="#">Pages</Link>
                      <ul className="dropdown">
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to='/doctors'>Doctor</Link></li>
                        <li><Link to="/blog-details">Blog Details</Link></li>
                      </ul>
                    </li>
                   
                  </ul>
                </nav>
              </div>
            </div>

            <div className="col-lg-5 d-flex justify-content-end d-none d-lg-flex">
              <div className="header__btn d-flex justify-content-center">
                {isLoggedIn ? (
                  <>
                    {/* Inbox and Notifications Icons */}
                    <div className="d-flex align-items-center mx-2">
                      <Link to='/inbox'><img src="/img/mail.png" alt="Inbox" style={{ width: '30px', height: '30px' }} /></Link>
                    </div>
                    <div className="d-flex align-items-center mx-2">
                      <img src="/img/notification-bell.png" alt="Notifications" style={{ width: '30px', height: '30px' }} />
                    </div>

                    {/* User Dropdown */}
                    <li className="nav-item navbar-dropdown dropdown-user dropdown" style={{ listStyle: 'none' }}>
                      <a 
                        className="nav-link dropdown-toggle hide-arrow p-0 w-25 h-25" 
                        href="javascript:void(0);" 
                        onClick={toggleDropdown}  // Manually toggle the dropdown
                      >
                        <div className="avatar avatar-online">
                          <img
                            src="/img/profile.png"
                            alt="User Avatar"
                            style={{ width: '30px', height: '30px' , marginTop: '16px'}}
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </a>
                      {/* Dropdown menu with manual open/close based on state */}
                      <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}>
                        <li>
                          <a className="dropdown-item" href="#">
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3 w-25 h-25 ">
                                <div className="avatar avatar-online">
                                  <img
                                    src="/img/1.png"
                                    alt="User Avatar"
                                    className="w-px-40 h-auto rounded-circle"
                                  />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-0">{username}</h6>
                                <small className="text-muted">{userrole}</small>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li><div className="dropdown-divider my-1"></div></li>
                        <li><a className="dropdown-item" href="#"><i className="bx bx-user bx-md me-3"></i>My Profile</a></li>
                        <li><a className="dropdown-item" href="#"><i className="bx bx-cog bx-md me-3"></i>Settings</a></li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="d-flex align-items-center align-middle">
                              <i className="bx bx-credit-card bx-md me-3"></i>
                              <span className="flex-grow-1 align-middle">Billing Plan</span>
                              <span className="badge rounded-pill bg-danger">4</span>
                            </span>
                          </a>
                        </li>
                        {userrole === 'admin' && (
                          <li><a className="dropdown-item" target='_blank' href="/admin/Dashboard"><i className="bx bx-cog bx-md me-3"></i>Admin Dashboard</a></li>
                        )}
                        {userrole === 'doctor' && (
                          <>
                            <li><a className="dropdown-item"  href="/availability"><i className="bx bx-cog bx-md me-3"></i>Availability</a></li>
                            <li><a className="dropdown-item"  href="/consultation"><i className="bx bx-cog bx-md me-3"></i>Consultation</a></li>
                          </>
                        )}
                         {userrole === 'patient' && (
                          <>
                            <li><a className="dropdown-item"  href="/request-doctor"><i className="bx bx-cog bx-md me-3"></i>Apply Doctor</a></li>
                            <li><a className="dropdown-item"  href="/appointment-list"><i className="bx bx-cog bx-md me-3"></i>My Appointments</a></li>
                          </>
                        )}
                        <li><div className="dropdown-divider my-1"></div></li>
                        <li>
                          <a className="dropdown-item" href="javascript:void(0);" onClick={handleLogoutClick}>
                            <i className="bx bx-power-off bx-md me-3"></i>Log Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    {showLogin ? (
                      <Link to="/login" className="btn btn-sm btn-outline-info py-2 w-35 mx-1" onClick={handleLoginClick}>
                        Login
                      </Link>
                    ) : (
                      <Link to="/register" className="btn btn-sm btn-outline-info py-2 w-35 mx-1" onClick={handleRegisterClick}>
                        Register
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="canvas__open d-lg-none" onClick={toggleOffcanvas}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
