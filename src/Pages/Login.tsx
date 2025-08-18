import { useState } from "react";
import type { LoginForm } from "../types/index";
import {
  validationForSingleFieldLogin,
  validationLoginForm,
} from "../formValidation/Login";
import styles from "../Style/login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../utils/logo.png";

const defaultForm: LoginForm = {
  userEmail: "jobseeker1@gmail.com",
  password: "1234",
};

const Login = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const [form, setForm] = useState<LoginForm>(defaultForm);
  //LoginForm
  const [errors, setErrors] = useState<Partial<LoginForm>>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //set all form values based on there names via controlled react form handler function
    const { name, value } = e.target;
    setForm((pervious: LoginForm) => ({
      ...pervious,
      [name]: value,
    }));
  };
  const validationCheck = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    const validationErrors: Partial<LoginForm> = validationForSingleFieldLogin(
      form,
      name
    );
    if (Object.keys(validationErrors).length > 0) {
      if (errors) setErrors((errors) => ({ ...errors, ...validationErrors }));
      return;
    }
  };
  const handleSubmit = () => {
    const validationErrors = validationLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors) setErrors(validationErrors);
      return;
    }
    setErrors({});
    sendLogin(form);
    setLoading(true);
  };

  const sendLogin = async (data: LoginForm) => {
    axios
      .post(`${baseUrl}/user/login`, data)
      .then((res) => {
        setLoading(false);
        if (res.status !== 200) {
          toast.warn(res.data);
        } else if (res.status === 200) {
          toast.dismiss();
          toast(res.data.message);
          const tokenResp = res.headers["authorization"]?.toString();
          const token = tokenResp && tokenResp.split(" ")[1];
          token && localStorage.setItem("JOB_APP_TOKEN", token);
          const userRole = res.data?.role;
          userRole && localStorage.setItem("JOB_APP_ROLE", userRole);
          userRole === "company"
            ? navigate("/dash-board")
            : navigate("/dash-board-jobseeker");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          toast(error.response.statusText);
        } else if (
          error.response?.status >= 400 ||
          error.response?.status < 500
        ) {
          toast.error(error.response.data);
        } else toast("Somthing went wrong !");
        console.log("error", error);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <form id={styles.form}>
        <div className={styles.loginHeader} style={{ marginBottom: "40px" }}>
          <h2>Welcome Back</h2>
          <p>Enter your credentials to acssess your account.</p>
        </div>
        <div aria-label="Registartion form" id={styles.applicationForm}>
          <label htmlFor="userEmail">Enter your email</label>
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

          <label htmlFor="password">Enter password</label>
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

          <button
            type="button"
            onClick={handleSubmit}
            id={styles.loginBtn}
            disabled={loading}>
            Sign in
          </button>
          <div id={styles.footer}>
            <button
              type="button"
              onClick={() => navigate("/registration")}
              id={styles.register}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
