import { useNavigate } from "react-router-dom";
import arrowBack from "../../../assets/images/reusable/arrow.svg";
import "../header.css";

function HeaderResponsiveBackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <button
      type="button"
      className="header__responsive-button"
      onClick={handleClick}
    >
      <img
        src={arrowBack}
        className="header__responsive-button-image"
        alt="arrow back image"
      />
    </button>
  );
}

export default HeaderResponsiveBackButton;
