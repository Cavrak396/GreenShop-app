import ReactDOM from "react-dom";
import { OverlayModalTypes } from "../types/modalTypes";
import Button from "../button/Button";
import close from "../../assets/images/reusable/close-image.svg";
import "./portal.css";

function Portal({ children, setIsAppear }: OverlayModalTypes) {
  function handleOverlayClose(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setIsAppear(false);
    }
  }

  return ReactDOM.createPortal(
    <div className="modal__overlay" onClick={handleOverlayClose}>
      <div className="modal__content">
        <Button
          className="modal__close-button"
          onClick={() => setIsAppear(false)}
        >
          <img src={close} className="modal__close-image" alt="close image" />
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root") as HTMLElement
  );
}

export default Portal;
