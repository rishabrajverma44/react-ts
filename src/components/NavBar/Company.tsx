import { useState } from "react";
import { Link } from "react-router-dom";

const CompanyNav = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <main className="main-header">
        <nav className="navbar">
          <div className="navbar-container">
            <section className="navbar-section">
              <div className="logo-container">
                <Link to="/mobilehome">
                  <img src="logo" alt="logo" />
                </Link>
              </div>

              <h2 className="site-title">Job App Company</h2>

              <button onClick={() => setMenu(true)} className="menu-open-btn">
                open icon
              </button>

              <div className="desktop-avatar">
                <div className="avatar-container">
                  <span>
                    <button onClick={toggleDropdown}>
                      <img
                        src="/images/avatar-1.jpg"
                        alt=""
                        className="avatar-img"
                      />
                    </button>

                    {isOpen && (
                      <div className="dropdown-menu">
                        <div className="dropdown-content">
                          <button type="submit" className="dropdown-item">
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

          {/* <div
            className={`mobile-menu-overlay ${isSideMenuOpen ? "open" : ""}`}>
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

                <button type="submit">Sign out</button>
              </div>
            </section>
          </div> */}
        </nav>
      </main>
    </>
  );
};

export default CompanyNav;
