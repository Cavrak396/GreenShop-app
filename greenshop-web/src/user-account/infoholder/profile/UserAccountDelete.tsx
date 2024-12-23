import Button from "../../../components/button/Button";

function UserAccountDelete() {
  return (
    <div className="useraccount__profile-delete">
      <p className="useraccount__profile-text">
        If you wish to delete your account, you can easily do so by clicking the
        button below. You're always welcome back!
      </p>
      <Button className="useraccount__profile-button button">
        Delete Account
      </Button>
    </div>
  );
}

export default UserAccountDelete;
