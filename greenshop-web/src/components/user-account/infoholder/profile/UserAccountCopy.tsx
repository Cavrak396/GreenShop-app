import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../../reusable/button/Button";
import CopyImg from "../../../../assets/images/account/copy.svg";

function UserAccountCopy() {
  function handleCopy() {
    const siteUrl = window.location.href;
    navigator.clipboard
      .writeText(siteUrl)
      .then(() => {
        toast.success("URL successfully copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL. Please try again.");
        console.error("Failed to copy URL: ", err);
      });
  }

  return (
    <div className="useraccount__profile-copy">
      <Button
        className="useraccount__profile-button button"
        onClick={handleCopy}
      >
        Share your experience with friends
        <img
          src={CopyImg}
          alt="copy"
          className="useraccount__profile-copy-image"
        />
      </Button>
      <ToastContainer />
    </div>
  );
}

export default UserAccountCopy;
