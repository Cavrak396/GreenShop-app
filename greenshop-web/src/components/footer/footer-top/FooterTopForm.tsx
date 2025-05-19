import React, { useState } from "react";
import TextInput from "../../../reusable/inputs/TextInput";
import Title from "../../../reusable/titles/Title";
import { toast } from "react-toastify";
import { useSubscriber } from "../../../context/SubscribersContext";

function FooterTopForm() {
  const [email, setEmail] = useState("");
  const { subscribe, loading } = useSubscriber();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const result = await subscribe(email);
      setEmail("");

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error: unknown) {
      toast.error("Something went wrong. Please try again later.");
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
        buttonText={loading ? "Joining..." : "Join"}
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
