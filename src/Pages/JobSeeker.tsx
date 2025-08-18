import { useEffect, useState } from "react";
import JobsPage from "../components/Jobseeker/JobPage";
import { getNumbersOfFormApplied } from "../Api/ApiCall/jobSeekers";

const JobSeeker = () => {
  const [NumbersOfFormApplied, setNumbersOfFormApplied] = useState<number>();

  const getAppliedForms = async () => {
    const appliedForm = await getNumbersOfFormApplied();
    setNumbersOfFormApplied(appliedForm);
  };

  useEffect(() => {
    getAppliedForms();
  }, []);
  return (
    <>
      <nav role="banner" className="banner">
        <div className="header">
          <h2>Job Application Tracker</h2>
          <p>Total Applied Jobs : {NumbersOfFormApplied}</p>
        </div>
      </nav>
      <div>
        <JobsPage />
      </div>
    </>
  );
};

export default JobSeeker;
