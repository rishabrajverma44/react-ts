import type { RegistrationForm, LoginForm } from "../types";

export function validationRegisterForm(form: RegistrationForm) {
  //partrial utility type used for giving types of an object wich accepts (key, type)
  const errors: Partial<Record<keyof RegistrationForm, string>> = {};

  if (!form.userName.trim()) errors.userName = "User name is required !";
  if (!form.role.trim()) errors.role = "Role is required !";
  if (!form.userEmail.trim()) errors.userEmail = "Email is required !";
  if (!form.password.trim()) errors.password = "Password is required !";
  return errors;
}

export function validationForSingleFieldRegister(
  form: RegistrationForm,
  name: string
) {
  //partrial utility type used for giving types of an object wich accepts (key, type)
  const errors: Partial<Record<keyof RegistrationForm, string>> = {};
  switch (name) {
    case "userName":
      if (!form.userName.trim()) {
        errors.userName = "userName is required !";
      } else {
        errors.userName = "";
      }
      break;
    case "role":
      if (!form.role.trim()) {
        errors.role = "Role is required !";
      } else {
        errors.role = "";
      }
      break;
    case "userEmail":
      if (!form.userEmail.trim()) {
        errors.userEmail = "userEmail is required !";
      } else {
        errors.userEmail = "";
      }
      break;

    case "password":
      if (!form.password.trim()) {
        errors.password = "password is required !";
      } else {
        errors.password = "";
      }
      break;
  }
  return errors;
}

export function validationLoginForm(form: LoginForm) {
  //partrial utility type used for giving types of an object wich accepts (key, type)
  const errors: Partial<Record<keyof LoginForm, string>> = {};

  if (!form.userEmail.trim()) errors.userEmail = "Email is required !";
  if (!form.password.trim()) errors.password = "Password is required !";
  return errors;
}

export function validationForSingleFieldLogin(form: LoginForm, name: string) {
  //partrial utility type used for giving types of an object wich accepts (key, type)
  const errors: Partial<Record<keyof LoginForm, string>> = {};
  switch (name) {
    case "userEmail":
      if (!form.userEmail.trim()) {
        errors.userEmail = "userEmail is required !";
      } else {
        errors.userEmail = "";
      }
      break;

    case "password":
      if (!form.password.trim()) {
        errors.password = "password is required !";
      } else {
        errors.password = "";
      }
      break;
  }
  return errors;
}
