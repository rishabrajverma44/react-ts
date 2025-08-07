import { useNavigate } from "react-router-dom";
import { UseFormContext } from "../../context/UseFormContext";
import style from "../../Style/header.module.css";
const Header = () => {
  const formCtx = UseFormContext();
  const data = formCtx?.headerData;
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
        <p aria-label="Job application status summary">
          <span aria-label="Total job applications">
            Job Applications: <span>{data?.totalApplication}</span>
          </span>{" "}
          <span aria-label="Total job applied">
            Applied: <span>{data?.totalApplied}</span>
          </span>{" "}
          <span aria-label="Total job interviewing">
            {" "}
            Interviewing: <span>{data?.totalInterviewing}</span>
          </span>{" "}
          <span aria-label="Total job hired">
            {" "}
            Hired: <span>{data?.totalHired}</span>{" "}
          </span>
          <span aria-label="Total job rejected">
            Rejected: <span>{data?.totalRejected}</span>
          </span>
        </p>
      </div>
      <div className={style.LogoutBtn}>
        <button onClick={handleLogout}>logout</button>
      </div>
    </nav>
  );
};

export default Header;
