import ReactDOM from "react-dom";
import { OverlayModalTypes } from "../types/modalTypes";
import "../reusable.css";
import Button from "../../components/button/Button";
import close from "../../assets/images/reusable/close-image.svg";

function Portal({ children, setIsAppear }: OverlayModalTypes) {
  return ReactDOM.createPortal(
    <div className="modal__overlay">
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
