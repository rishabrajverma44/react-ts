import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Employer from "../Pages/Employer";
import Jobseeker from "../Pages/JobSeeker";
import NotFound from "../Pages/NotFound";
import Registration from "../Pages/Registration";
import CompanyAuth from "../Auth/CompanyAuth";
import JobSeekerAuth from "../Auth/JobseekerAuth";
import Form from "../components/Company/Form";

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
    path: "/company",
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
    path: "/Jobseeker",
    element: (
      <JobSeekerAuth allowedRoles={["job_seeker"]}>
        <Jobseeker />
      </JobSeekerAuth>
    ),
  },

  // Catch-All Route
  { path: "*", element: <NotFound /> },
];

// Create the router instance
const Router = createBrowserRouter(Routes);
export default Router;
