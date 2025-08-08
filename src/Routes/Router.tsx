import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Employer from "../Pages/Employer";
import Jobseeker from "../Pages/JobSeeker";
import NotFound from "../Pages/NotFound";
import Registration from "../Pages/Registration";
import AuthCheck from "../Auth/AuthCheck";

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
      <AuthCheck allowedRoles={["company"]}>
        <Employer />
      </AuthCheck>
    ),
  },
  {
    path: "/Jobseeker",
    element: (
      <AuthCheck allowedRoles={["job_seeker"]}>
        <Jobseeker />
      </AuthCheck>
    ),
  },

  // Catch-All Route
  { path: "*", element: <NotFound /> },
];

// Create the router instance
const Router = createBrowserRouter(Routes);
export default Router;
