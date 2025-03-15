import React, { useRef, useState, useCallback } from "react";
import { useUser } from "../../context/AuthContext";
import AuthTypeOption from "./AuthTypeOption";
import { authInstructions, emailRegex } from "./utils/authUtils";
import AuthForm from "./AuthForm";
import { useSubscriber } from "../../context/SubscribersContext";
import LoadingSpinner from "../../reusable/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import "./authorization.css";

function AuthContent() {
  const [activatedId, setActivatedId] = useState<number>(1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});
  const { login, register, setUser, setToken, loading } = useUser();
  const { subscribe } = useSubscriber();

  const togglePasswordVisibility = useCallback((id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = inputRefs.current[1]?.value;
      const password = inputRefs.current[2]?.value;
      const confirmationPassword = inputRefs.current[3]?.value;
      const name = inputRefs.current[4]?.value;
      const subscribeEmail = inputRefs.current[5]?.value;

      if (activatedId === 1) {
        // Login
        if (email && password) {
          const loginResponse = await login({ email, password });
          if ('jwt' in loginResponse) {
            setUser({ email });
            setToken(loginResponse.jwt);
            toast.success("Successfully logged in!");
          } else if (!emailRegex.test(email)) {
            toast.error("Write a correct email.");
          } else {
            toast.error("This account doesn't exist");
          }
        } else {
          toast.error("Email and password are required.");
        }
      } else {
        // Register
        if (!name || !email || !password || password !== confirmationPassword) {
          if (password !== confirmationPassword) {
            toast.error("Passwords do not match.");
          } else {
            toast.error("All fields are required for registration.");
          }
          return;
        }

        if (subscribeEmail && subscribeEmail !== email) {
          toast.error("Subscription email does not match registration email.");
          return;
        }

        await register({
          name,
          email,
          password,
          isSubscribed: subscribeEmail ? true : false,
        });

        if (subscribeEmail) {
          const subscribeResponse = await subscribe(subscribeEmail);

          if (subscribeResponse.success) {
            toast.success("Successfully registered and subscribed!");
          } else {
            toast.success("Successfully registered!");
          }
        } else {
          toast.success("Successfully registered!");
        }
      }
    } catch (err: unknown) {
      console.error("Error during authentication:", err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred.");
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
    </div>
  );
}

export default AuthContent;
