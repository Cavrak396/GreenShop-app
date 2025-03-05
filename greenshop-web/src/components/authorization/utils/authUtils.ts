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

export const authInputs: AuthInput[] = [
  { id: 1, type: "text", placeholder: "Enter your email address" },
  { id: 2, type: "password", placeholder: "Password", icon: hide },
  { id: 3, type: "password", placeholder: "Confirm password", icon: hide },
  { id: 4, type: "text", placeholder: "Create your username" },
  { id: 5, type: "text", placeholder: "Enter you email for subscribe" }
];

export const socialAccountWays: SocialButton[] = [
  { id: 1, alt: "google", src: google },
  { id: 2, alt: "facebook", src: facebook },
];
