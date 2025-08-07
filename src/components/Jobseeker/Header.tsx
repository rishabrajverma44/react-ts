import { useNavigate } from "react-router-dom";
import style from "../../Style/header.module.css";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("JOB_APP_TOKEN");
    localStorage.removeItem("JOB_APP_ROLE");
    navigate("/");
  };
  return (
    <nav role="banner" className={style.banner}>
      <div className={style.header}>
        <h2>Job Application Tracker</h2>
        <p>
          <span>Total Applied Jobs :</span>
        </p>
      </div>
      <div className={style.LogoutBtn}>
        <button onClick={handleLogout}>logout</button>
      </div>
    </nav>
  );
};

export default Header;
