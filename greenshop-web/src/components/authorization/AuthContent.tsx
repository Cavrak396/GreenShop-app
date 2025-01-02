import React, { useRef, useState, useCallback } from "react";
import { useUser } from "../../context/AuthContext";
import AuthTypeOption from "./AuthTypeOption";
import { authInstructions } from "./utils/authUtils";
import AuthForm from "./AuthForm";
import "./authorization.css";

const AuthContent: React.FC = () => {
  const [activatedId, setActivatedId] = useState<number>(1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { login, register, setUser, setToken, loading } = useUser();

  const togglePasswordVisibility = useCallback((id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setError(null);

    try {
      const email = inputRefs.current[1]?.value;
      const password = inputRefs.current[2]?.value;

      if (activatedId === 1) {
        // Login
        if (email && password) {
          const loginResponse = await login({ email, password });

          if (loginResponse && loginResponse.jwt) {
            setUser({ email });
            setToken(loginResponse.jwt);
            setSuccessMessage("Successfully logged in!");
            console.log(loginResponse.jwt);
          } else {
            setError("Login failed: Invalid response");
          }
        } else {
          setError("Email and password are required.");
        }
      } else {
        // Register
        const name = inputRefs.current[4]?.value;
        const password = inputRefs.current[3]?.value;

        if (name && email && password) {
          await register({ name, email, password });
          setSuccessMessage("Successfully registered!");
        } else {
          setError("All fields are required for registration.");
        }
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setSuccessMessage(null);
      setError(err.message || "An error occurred.");
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
      {loading && <p>Loading...</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && (
        <p style={{ color: "red" }}>
          {activatedId === 1
            ? `Login failed: ${error}`
            : `Registration failed: ${error}`}
        </p>
      )}
    </div>
  );
};

export default AuthContent;
