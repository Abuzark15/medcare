import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faUserDoctor, faUsers, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isSidebarOpen }) => {
  const [collapsed, setCollapsed] = useState({
    pages: false,
    posts: false,
    auth: false,
    multi: false,
  });

  const handleToggle = (section) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside id="sidebar" className={`js-sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="h-100">
        <div className="sidebar-logo">
          <Link to="#">CodzSword</Link>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Admin Elements</li>
          <li className="sidebar-item">
            <Link to="Dashboard" className="sidebar-link">
              <FontAwesomeIcon icon={faTachometerAlt} className="pe-2" />
              Dashboard
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="Requests" className="sidebar-link">
              <FontAwesomeIcon icon={faFileAlt} className="pe-2" />
              Request for Doctor
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="#" className="sidebar-link">
              <FontAwesomeIcon icon={faUserDoctor} className="pe-2" />
              Doctors
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="#" className="sidebar-link">
              <FontAwesomeIcon icon={faUsers} className="pe-2" />
              Users
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="#" className="sidebar-link">
              <FontAwesomeIcon icon={faCalendarCheck} className="pe-2" />
              Appointments
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
