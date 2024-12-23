import Button from "../../../components/button/Button";

function UserAccountLogout() {
  return (
    <div className="useraccount__logout">
      <p className="useraccount__logout-text">
        Click the button below to log out of your account. This action will end
        your current session and ensure your data remains secure. After logging
        out, you will be redirected to the home page or login screen, where you
        can sign in again using your credentials. If you are done using the
        application or are on a shared device, we recommend logging out to
        protect your data and maintain your privacy.
      </p>
      <Button className="useraccount__logout-button button">Logout</Button>
    </div>
  );
}

export default UserAccountLogout;
