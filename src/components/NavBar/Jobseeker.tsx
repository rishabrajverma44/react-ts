import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../utils/logo.png";
import avatar from "../../utils/avatar.jpg";
import { getUserName } from "../../Api/ApiCall/jobSeekers";

const JobseekerNav = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [userName, setUserName] = useState();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userCredentials");
    navigate("/");
  };
  (async () => {
    const user = await getUserName();
    setUserName(user);
  })();

  return (
    <>
      <main className="main-header">
        <nav className="navbar">
          <div className="navbar-container">
            <section className="navbar-section">
              <div className="logo-container">
                <Link to="/mobilehome">
                  <img src={logo} alt="logo" className="logo" />
                </Link>
                <button onClick={() => setMenu(true)} className="menu-open-btn">
                  open
                </button>
              </div>

              <h3 className="site-title">Job App Jobseeker</h3>

              <div className="desktop-avatar">
                <div className="avatar-container">
                  <span>{userName}</span>
                  <span>
                    <button className="none_btn" onClick={toggleDropdown}>
                      <img src={avatar} alt="avatar" className="avatar-img" />
                    </button>
                    {isOpen && (
                      <div className="dropdown-menu">
                        <div className="dropdown-content">
                          <button
                            type="submit"
                            className="dropdown-item none_btn">
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className={`transition ${isSideMenuOpen ? "open" : ""}`}>
            <section className="mobile-menu">
              <button onClick={() => setMenu(false)} className="menu-close-btn">
                close
              </button>
              <div className="mobile-links">
                <Link to="/company" onClick={() => setMenu(false)}>
                  Home
                </Link>
                <Link to="/new" onClick={() => setMenu(false)}>
                  new
                </Link>

                <button type="submit" onClick={handleLogout}>
                  Sign out
                </button>
              </div>
            </section>
          </div>
        </nav>
      </main>
    </>
  );
};

export default JobseekerNav;
