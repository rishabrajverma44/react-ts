import { useState } from "react";
import type { RegistrationForm } from "../types/index";
import {
  validationForSingleFieldRegister,
  validationRegisterForm,
} from "../formValidation/Login";
import styles from "../Style/login.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const defaultForm: RegistrationForm = {
  userName: "",
  role: "",
  userEmail: "",
  password: "",
};

const Registration = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [form, setForm] = useState<RegistrationForm>(defaultForm);
  //RegistrationForm
  const [errors, setErrors] = useState<Partial<RegistrationForm>>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //set all form values based on there names via controlled react form handler function
    const { name, value } = e.target;
    setForm((pervious: RegistrationForm) => ({
      ...pervious,
      [name]: value,
    }));
  };
  const validationCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    const validationErrors: Partial<RegistrationForm> =
      validationForSingleFieldRegister(form, name);
    if (Object.keys(validationErrors).length > 0) {
      if (errors) setErrors((errors) => ({ ...errors, ...validationErrors }));
      return;
    }
  };
  const handleSubmit = () => {
    const validationErrors = validationRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Validate form !");
      if (validationErrors) setErrors(validationErrors);
      return;
    }
    setErrors({});
    sendRegistration(form);
  };
  const sendRegistration = async (data: RegistrationForm) => {
    axios
      .post(`${baseUrl}/user/register`, data)
      .then((res) => {
        if (res.status !== 201) {
          toast.warn(res.data);
        } else if (res.status === 201) {
          toast("Registed successfully !");
          setForm(defaultForm);
          navigate("/");
        }
      })
      .catch(() => {
        return null;
      });
  };
  return (
    <div className={styles.container}>
      <form id={styles.form}>
        <div>
          <h2>Registration form</h2>
        </div>
        <div aria-label="Registration form" id={styles.applicationForm}>
          <label htmlFor="">User Name:</label>
          <input
            id="userName"
            type="text"
            placeholder="user name"
            name="userName"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.userName}
            style={{ borderColor: errors?.userName ? "red" : "initial" }}
          />
          {errors?.userName && (
            <span className={styles.validation_error}>{errors?.userName}</span>
          )}

          <label htmlFor="role">Select role:</label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.role}
            style={{ borderColor: errors?.role ? "red" : "initial" }}>
            <option value="" disabled>
              Select your role
            </option>
            <option value="job_seeker">Job Seeker</option>
            <option value="company">Employer</option>
          </select>
          {errors?.role && (
            <span className={styles.validation_error}>{errors?.role}</span>
          )}

          <label htmlFor="userEmail">Enter your email :</label>
          <input
            id="userEmail"
            type="email"
            name="userEmail"
            placeholder="Enter your email"
            value={form.userEmail}
            onChange={handleChange}
            onBlur={validationCheck}
            style={{ borderColor: errors?.userEmail ? "red" : "initial" }}
          />
          {errors?.userEmail && (
            <span className={styles.validation_error}>{errors?.userEmail}</span>
          )}

          <label htmlFor="password">Enter password:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.password}
            style={{ borderColor: errors?.password ? "red" : "initial" }}
          />
          {errors?.password && (
            <span className={styles.validation_error}>{errors?.password}</span>
          )}

          <button type="button" onClick={handleSubmit} id={styles.submitBtn1}>
            Submit
          </button>
          <div id={styles.footer}>
            <button
              type="button"
              onClick={() => navigate("/")}
              id={styles.submitBtn2}>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
