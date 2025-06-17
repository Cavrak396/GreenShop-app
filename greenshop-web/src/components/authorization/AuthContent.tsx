import React, { useRef, useState, useCallback } from "react";
import { useUser } from "../../context/AuthContext";
import AuthTypeOption from "./AuthTypeOption";
import AuthForm from "./AuthForm";
import LoadingSpinner from "../../reusable/loadingSpinner/LoadingSpinner";
import { authInstructions, validateForm } from "./utils/authUtils";
import { AuthContentProps } from "./types/authTypes";
import { toast } from "react-toastify";
import ErrorMessage from "../../reusable/error/ErrorMessage";
import "./authorization.css";

function AuthContent({ onLoginSuccess }: AuthContentProps) {
  const [activatedId, setActivatedId] = useState<number>(1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, register, setUser, setToken, loading } = useUser();

  const togglePasswordVisibility = useCallback((id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const email = inputRefs.current[1]?.value ?? "";
    const password = inputRefs.current[2]?.value ?? "";
    const confirmationPassword = inputRefs.current[3]?.value ?? "";
    const name = inputRefs.current[4]?.value ?? "";
    const subscribeEmail = inputRefs.current[5]?.value ?? "";

    const formData = {
      email,
      password,
      confirmationPassword,
      name,
      subscribeEmail,
    };

    const errors = validateForm(formData, activatedId);
    if (errors.length > 0) {
      setErrorMessage(errors.join(" "));
      return;
    }

    try {
      if (activatedId === 1) {
        // Login
        const loginResponse = await login({ email, password });
        if ("jwt" in loginResponse) {
          setUser({ email });
          setToken(loginResponse.jwt);
          toast.success("Successfully logged in!");
          if (onLoginSuccess) onLoginSuccess();
        } else {
          setErrorMessage("This account doesn't exist!");
        }
      } else {
        // Register
        const registrationResponse = await register({
          name,
          email,
          password,
          isSubscribed: subscribeEmail ? true : false,
        });

        if (registrationResponse) {
          toast.success("Successfully registered!");
          setActivatedId(1);
        } else {
          toast.error("Registration failed! Please try again.");
        }
      }
    } catch (err: unknown) {
      console.error("Error during authentication:", err);

      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred!");
      }
    }
  };

  return (
    <div className="authorization__holder">
      <AuthTypeOption
        setActivatedId={setActivatedId}
        activatedId={activatedId}
        inputRefs={inputRefs}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <p className="authorization__message">
        Enter your {authInstructions.get(activatedId)}.
      </p>
      <AuthForm
        activatedId={activatedId}
        inputRefs={inputRefs}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        onSubmit={handleSubmit}
      />
      {loading && <LoadingSpinner />}
      <ErrorMessage
        className="authorization__error-message"
        message={errorMessage}
      />
    </div>
  );
}

export default AuthContent;
