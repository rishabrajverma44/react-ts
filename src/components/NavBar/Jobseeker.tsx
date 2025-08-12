import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../utils/logo.png";
import avatar from "../../utils/avatar.jpg";
import { getUserName } from "../../Api/ApiCall/jobSeekers";

const JobseekerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [userName, setUserName] = useState();

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
              </div>

              <h3 className="site-title">Job App Jobseeker</h3>

              <div className="avatar">
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
        </nav>
      </main>
    </>
  );
};

export default JobseekerNav;
