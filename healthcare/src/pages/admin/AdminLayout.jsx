import React, { useState } from "react";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`wrapper ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        <Outlet/>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
