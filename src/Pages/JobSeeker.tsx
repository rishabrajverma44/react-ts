import { useEffect, useState } from "react";
import JobsPage from "../components/Jobseeker/JobPage";
import { getUserAppliedFormNumber } from "../Api/ApiCall/jobSeekers";

const JobSeeker = () => {
  const [userAppliedFormNumber, setUserAppliedFormNumber] = useState<number>();

  const getAppliedForms = async () => {
    const appliedForm = await getUserAppliedFormNumber();
    setUserAppliedFormNumber(appliedForm);
  };

  useEffect(() => {
    getAppliedForms();
  }, []);
  return (
    <>
      <nav role="banner" className="banner">
        <div className="header">
          <h2>Job Application Tracker</h2>
          <p>Total Applied Jobs : {userAppliedFormNumber}</p>
        </div>
      </nav>
      <div>
        <JobsPage />
      </div>
    </>
  );
};

export default JobSeeker;
