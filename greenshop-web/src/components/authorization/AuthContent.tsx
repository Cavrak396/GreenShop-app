import "./authorization.css";
import { useRef, useState, useCallback } from "react";
import AuthTypeOption from "./AuthTypeOption";
import { authInstructions } from "./utils/authUtils";
import AuthForm from "./AuthForm";

function AuthContent() {
  const [activatedId, setActivatedId] = useState<number>(1);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>(
    {}
  );

  const togglePasswordVisibility = useCallback((id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

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
      />
    </div>
  );
}

export default AuthContent;
