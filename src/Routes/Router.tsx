import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Employer from "../Pages/Employer";
import Jobseeker from "../Pages/JobSeeker";
import NotFound from "../Pages/NotFound";
import Registration from "../Pages/Registration";
import JobDetails from "../components/Jobseeker/JobDetails";
import CompanyAuth from "../Auth/CompanyAuth";
import JobSeekerAuth from "../Auth/JobseekerAuth";

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
  {
    path: "/company",
    element: (
      <CompanyAuth allowedRoles={["company"]}>
        <Employer />
      </CompanyAuth>
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
    path: "/jobdetails",
    element: (
      <JobSeekerAuth allowedRoles={["job_seeker"]}>
        <JobDetails />
      </JobSeekerAuth>
    ),
  },

  // Catch-All Route
  { path: "*", element: <NotFound /> },
];

// Create the router instance
const Router = createBrowserRouter(Routes);
export default Router;
