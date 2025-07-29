import style from "../Style/header.module.css";
const Header = () => {
  return (
    <nav className={style.header}>
      <h2>Job Application Tracker</h2>
      <p>
        <span>Job Applications: 0 </span>
        <span>Applied: 0 </span>
        <span> Interviewing: 0 </span>
        <span> Hired: 0 </span>
        <span>Rejected: 0</span>
      </p>
    </nav>
  );
};

export default Header;
