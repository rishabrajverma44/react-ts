import style from "../Style/header.module.css";
const Header = () => {
  return (
    <nav role="banner" className={style.header}>
      <h2>Job Application Tracker</h2>
      <p aria-label="Job application status summary">
        <span aria-label="Total job applications">Job Applications: 0 </span>
        <span aria-label="Total job applied">Applied: 0 </span>
        <span aria-label="Total job interviewing"> Interviewing: 0 </span>
        <span aria-label="Total job hired"> Hired: 0 </span>
        <span aria-label="Total job rejected">Rejected: 0</span>
      </p>
    </nav>
  );
};

export default Header;
