import { Link, Navigate, useLocation } from "react-router-dom";
import CompanyNav from "../components/NavBar/Company";
import { useState } from "react";
import right from "../utils/applyNotConflictsRight.svg";
import left from "../utils/applyNotConflictsLeft.svg";
import { handleLogout } from "../utils/logout";
import menu from "../utils/minimap.svg";
import { FormContextProvider } from "../context/FormContextProvider";
type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const CompanyAuth = ({ children, allowedRoles = [] }: Props) => {
  const [isSideMenuOpen, setMenu] = useState(true);
  const toggleSidebar = () => {
    setMenu(!isSideMenuOpen);
  };
  const location = useLocation();
  const token = localStorage.getItem("JOB_APP_TOKEN");
  const role = localStorage.getItem("JOB_APP_ROLE");

  if (!token || !role || role !== "company") {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return (
    <div className="layout">
      <div className={`transition ${isSideMenuOpen ? "open" : ""}`}>
        <section className="sidebar-menu">
          <Link to="/dash-board">Home</Link>
          <Link to="/forms">Forms</Link>
          <button type="submit" onClick={handleLogout}>
            Sign out
          </button>
        </section>
        <div id="openSidebar">
          <button onClick={toggleSidebar} className="sidebar-open-btn none_btn">
            {isSideMenuOpen ? (
              <img src={right} alt="rightIcon" />
            ) : (
              <img src={left} alt="leftIcon" />
            )}
          </button>
        </div>
      </div>
      <div className="sidbarMobile">
        <img
          src={menu}
          alt="menuBar"
          className="mobilemenuimage"
          onClick={toggleSidebar}
        />
      </div>
      <CompanyNav />
      <div className="main-page-content">
        <div className={`content ${isSideMenuOpen ? "squeezed" : ""}`}>
          <div className={`children ${isSideMenuOpen ? "squeezed" : ""}`}>
            <FormContextProvider>{children}</FormContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuth;
