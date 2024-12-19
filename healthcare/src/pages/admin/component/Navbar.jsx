

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand px-3 border-bottom">
      <button
        className="btn"
        id="sidebar-toggle"
        type="button"
        onClick={toggleSidebar}  // This triggers the sidebar toggle
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse navbar">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
              <img
                src="image/profile.jpg"
                className="avatar img-fluid rounded"
                alt="Profile"
              />
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a href="#" className="dropdown-item">Profile</a>
              <a href="#" className="dropdown-item">Setting</a>
              <a href="#" className="dropdown-item">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
