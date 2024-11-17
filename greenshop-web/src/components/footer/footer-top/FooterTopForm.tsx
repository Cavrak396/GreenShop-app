import TextInput from "../../../reusable/inputs/TextInput";
import Title from "../../../reusable/titles/Title";

function FooterTopForm() {
  return (
    <form className="footer__top-form">
      <Title className="footer__top-form-title small-title">
        Would you like to join newsletters?
      </Title>
      <TextInput
        type="text"
        inputClass="footer__top-form-input"
        placeholder="enter your email address..."
        buttonText="Join"
        buttonClass="footer__top-form-button"
      />
      <p className="footer__top-form-text">
        We usually post offers and challenges in newsletter. We're your online
        houseplant destination. We offer a wide range of houseplants and
        accessories shipped directly from our greenhouse to yours!
      </p>
    </form>
  );
}

export default FooterTopForm;
