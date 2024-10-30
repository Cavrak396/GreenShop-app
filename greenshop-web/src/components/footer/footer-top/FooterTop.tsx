import FooterTopItems from "./FooterTopItems";
import FooterTopForm from "./FooterTopForm";
import "../footer.css";

function FooterTop() {
  return (
    <div className="footer__top-line">
      <FooterTopItems />
      <FooterTopForm />
    </div>
  );
}

export default FooterTop;
