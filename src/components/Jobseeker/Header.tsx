import style from "../../Style/header.module.css";
import { handleLogout } from "../../utils/logout";
const Header = () => {
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
