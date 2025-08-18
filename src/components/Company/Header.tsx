import { UseFormContext } from "../../context/FormContextProvider";
const Header = () => {
  const formCtx = UseFormContext();
  const data = formCtx?.headerData;
  return (
    <nav role="banner" className="banner">
      <div className="header">
        <h2>Job Application Tracker</h2>
        <p aria-label="Job application status summary">
          <span aria-label="Total job applications">
            Application posted : <span>{data?.totalApplication}</span>
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
    </nav>
  );
};

export default Header;
