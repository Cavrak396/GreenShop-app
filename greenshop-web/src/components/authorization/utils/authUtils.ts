import google from "../../../assets/images/auth/google.svg";
import facebook from "../../../assets/images/auth/facebook.svg";
import hide from "../../../assets/images/auth/Hide.svg";
import { AuthInput, AuthType, SocialButton } from "../types/authTypes";

export const authType: AuthType[] = [
  { id: 1, type: "Login" },
  { id: 2, type: "Register" },
];

export const authInstructions = new Map<number, string>([
  [1, "username and password to login"],
  [2, "email and password to register"],
]);

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{5,}$/;

export const authInputs: AuthInput[] = [
  { id: 1, type: "text", placeholder: "Enter your email address" },
  { id: 2, type: "password", placeholder: "Password", icon: hide },
  { id: 3, type: "password", placeholder: "Confirm password", icon: hide },
  { id: 4, type: "text", placeholder: "Create your username" },
  { id: 5, type: "text", placeholder: "Enter your email for subscribe" },
];

export const socialAccountWays: SocialButton[] = [
  { id: 1, alt: "google", src: google },
  { id: 2, alt: "facebook", src: facebook },
];

export const validateField = (
  field: "email" | "password" | "username" | "subscribeEmail",
  value: string
): string | null => {
  switch (field) {
    case "email":
      if (!emailRegex.test(value)) {
        return "Write a correct email!";
      }
      break;
    case "password":
      if (!passwordRegex.test(value)) {
        return "Password must have at least 8 characters, one uppercase letter, one number and one special character!";
      }
      break;
    case "username":
      if (!usernameRegex.test(value)) {
        return "Username must be at least 5 characters long, contain only letters and numbers, and include at least one letter!";
      }
      break;
    case "subscribeEmail":
      if (!emailRegex.test(value)) {
        return "Write a correct subscription email!";
      }
      break;
    default:
      return null;
  }
  return null;
};

export const validateForm = (
  data: {
    email: string;
    password: string;
    confirmationPassword: string;
    name: string;
    subscribeEmail: string;
  },
  activatedId: number
): string[] => {
  const errors: string[] = [];

  if (activatedId === 1) {
    if (!data.email) errors.push("Email is required!");
    else {
      const emailError = validateField("email", data.email);
      if (emailError) errors.push(emailError);
    }

    if (!data.password) errors.push("Password is required!");
    else {
      const passwordError = validateField("password", data.password);
      if (passwordError) errors.push(passwordError);
    }
  } else {
    if (!data.name) errors.push("Username is required!");
    else {
      const usernameError = validateField("username", data.name);
      if (usernameError) errors.push(usernameError);
    }

    if (!data.email) errors.push("Email is required!");
    else {
      const emailError = validateField("email", data.email);
      if (emailError) errors.push(emailError);
    }

    if (!data.password) errors.push("Password is required!");
    else {
      const passwordError = validateField("password", data.password);
      if (passwordError) errors.push(passwordError);
    }

    if (!data.confirmationPassword) errors.push("Confirm password is required!");
    else if (data.password !== data.confirmationPassword) {
      errors.push("Passwords do not match!");
    }

    if (data.subscribeEmail) {
      if (data.subscribeEmail !== data.email) {
        errors.push("Subscription email does not match registration email!");
      } else {
        const subscribeEmailError = validateField(
          "subscribeEmail",
          data.subscribeEmail
        );
        if (subscribeEmailError) errors.push(subscribeEmailError);
      }
    }
  }

  return errors;
};
