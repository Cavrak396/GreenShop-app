import React, { useState } from "react";
import TextInput from "../../../reusable/inputs/TextInput";
import Title from "../../../reusable/titles/Title";
import { subscribeToNewsletter } from "../../../services/subscribers/subscribers";
import { toast } from "react-toastify";

function FooterTopForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const result = await subscribeToNewsletter(email);
      setEmail("");

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred.");
      } else {
        toast.error("Failed to connect to the server. Please try again later.");
      }
    }
  };

  return (
    <form className="footer__top-form" onSubmit={handleSubmit}>
      <Title className="footer__top-form-title small-title">
        Would you like to join newsletters?
      </Title>
      <TextInput
        type="text"
        inputClass="footer__top-form-input"
        placeholder="Enter your email address..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        buttonText="Join"
        buttonClass="footer__top-form-button"
        onButtonClick={handleSubmit}
      />
      <p className="footer__top-form-text">
        We usually post offers and challenges in newsletters. We're your online
        houseplant destination. We offer a wide range of houseplants and
        accessories shipped directly from our greenhouse to yours!
      </p>
    </form>
  );
}

export default FooterTopForm;
