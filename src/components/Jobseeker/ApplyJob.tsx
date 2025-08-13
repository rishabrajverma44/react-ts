import { toast } from "react-toastify";
import { applyFormByFormID } from "../../Api/ApiCall/jobSeekers";
import styles from "../../Style/applyJob.module.css";

const ApplyJob = () => {
  //   const applyForm = async function (formId: string | null | undefined) {
  //     if (formId) {
  //       const res = await applyFormByFormID(formId);
  //       if (res) toast("Successfully applied !");
  //     }
  //   };
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div>
            <span>Company details</span>
          </div>
        </div>
        <div className={styles.rightSide}>
          <span>Job description</span>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
