import { Navigate, useLocation } from "react-router-dom";
import JobseekerNav from "../components/NavBar/Jobseeker";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const JobSeekerAuth = ({ children, allowedRoles = [] }: Props) => {
  const location = useLocation();
  const token = localStorage.getItem("JOB_APP_TOKEN");
  const role = localStorage.getItem("JOB_APP_ROLE");

  if (!token || !role || role !== "job_seeker") {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return (
    <>
      <JobseekerNav />
      {children}
    </>
  );
};

export default JobSeekerAuth;
