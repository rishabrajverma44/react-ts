export const handleLogout = () => {
  localStorage.removeItem("JOB_APP_TOKEN");
  localStorage.removeItem("JOB_APP_ROLE");
  location.href = "/";
};
