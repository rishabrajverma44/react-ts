import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Employer from "../Pages/Employer";
import Jobseeker from "../Pages/JobSeeker";
import NotFound from "../Pages/NotFound";
import Registration from "../Pages/Registration";
import CompanyAuth from "../Auth/CompanyAuth";
import JobSeekerAuth from "../Auth/JobseekerAuth";
import ApplyJob from "../components/Jobseeker/ApplyJob";
import Form from "../components/Company/Forms/Form";
import AppliedJobs from "../components/Jobseeker/Applied/AppliedJobs";
import DashBoardJob from "../components/Jobseeker/dashboard/DashBoardJob";
import DashboardCompany from "../components/Company/dashBoard/DashboardCompany";

// route configurations
const Routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  //company routes
  {
    path: "/dash-board",
    element: (
      <CompanyAuth allowedRoles={["company"]}>
        <DashboardCompany />
      </CompanyAuth>
    ),
  },
  {
    path: "/forms",
    element: (
      <CompanyAuth allowedRoles={["company"]}>
        <Employer />
      </CompanyAuth>
    ),
  },
  {
    path: "/addform/:id?",
    element: (
      <CompanyAuth allowedRoles={["company"]}>
        <Form />
      </CompanyAuth>
    ),
  },
  //jobseekers routes
  {
    path: "/dash-board-jobseeker",
    element: (
      <JobSeekerAuth allowedRoles={["job_seeker"]}>
        <DashBoardJob />
      </JobSeekerAuth>
    ),
  },
  {
    path: "/Jobseeker",
    element: (
      <JobSeekerAuth allowedRoles={["job_seeker"]}>
        <Jobseeker />
      </JobSeekerAuth>
    ),
  },
  {
    path: "/jobApply/:formID",
    element: (
      <JobSeekerAuth allowedRoles={["job_seeker"]}>
        <ApplyJob />
      </JobSeekerAuth>
    ),
  },
  {
    path: "/appliedJobs",
    element: (
      <JobSeekerAuth allowedRoles={["job_seeker"]}>
        <AppliedJobs />
      </JobSeekerAuth>
    ),
  },

  // Catch-All Route
  { path: "*", element: <NotFound /> },
];

// Create the router instance
const Router = createBrowserRouter(Routes);
export default Router;
