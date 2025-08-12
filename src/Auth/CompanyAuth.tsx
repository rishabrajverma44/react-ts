import { Navigate, useLocation } from "react-router-dom";
import CompanyNav from "../components/NavBar/Company";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const CompanyAuth = ({ children, allowedRoles = [] }: Props) => {
  const location = useLocation();
  const token = localStorage.getItem("JOB_APP_TOKEN");
  const role = localStorage.getItem("JOB_APP_ROLE");

  if (!token || !role || role !== "company") {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return (
    <>
      <CompanyNav />
      {children}
    </>
  );
};

export default CompanyAuth;
