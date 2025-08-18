import { useNavigate, useParams } from "react-router-dom";
import styles from "../../Style/applyJob.module.css";
import { useEffect, useState } from "react";
import {
  applyFormByFormID,
  getFormByFormId,
  isAppliedForm,
} from "../../Api/ApiCall/jobSeekers";
import type { CompanyDetails, formInterface } from "../../types";
import { toast } from "react-toastify";

const defaultForm: formInterface = {
  company: "",
  role: "",
  jobType: "",
  location: "",
  status: "",
  date: "",
  notes: "",
};
const defaultCompany: CompanyDetails = {
  userName: "",
};

const ApplyJob = () => {
  const { formID } = useParams<{ formID: string }>();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState<formInterface>(defaultForm);
  const [isApplied, setIsApplied] = useState<boolean>(true);
  const [companyDetails, setCompanyDetails] =
    useState<CompanyDetails>(defaultCompany);
  const getFormDetails = async () => {
    if (!formID) return;
    try {
      const response = await getFormByFormId(formID as string);
      setCompanyDetails(response.companyDetails);
      setFormDetails(response.formData);
    } catch (error) {
      console.error("Error fetching form details:", error);
    }
  };
  const isFormApplied = async () => {
    if (formID) {
      const isApplied = await isAppliedForm(formID);
      setIsApplied(isApplied);
    }
  };
  const applyForm = async () => {
    if (formID) {
      const response = await applyFormByFormID(formID);
      if (response.status) toast(response.data.message);
      setIsApplied(true);
    }
  };

  useEffect(() => {
    getFormDetails();
    isFormApplied();
  }, [formID, isApplied]);

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <span>Company Details</span>
          <span>
            Company Name: <strong>{companyDetails?.userName || "N/A"}</strong>
          </span>
          <span>Role: {formDetails.role}</span>
          <span>Location: {formDetails.location}</span>
          <div className={styles.apply}>
            <button onClick={() => navigate("/Jobseeker")}>Back</button>
            <button
              disabled={isApplied}
              className={styles.applyBtn}
              onClick={applyForm}>
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          </div>
        </div>
        <div className={styles.rightSide}>
          <span>Job Details</span>
          <div
            dangerouslySetInnerHTML={{
              __html:
                formDetails.notes || "<p>No additional details provided.</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
