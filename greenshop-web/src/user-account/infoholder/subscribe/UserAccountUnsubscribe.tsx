import Button from "../../../components/button/Button";

function UserAccountUnsubscribe() {
  return (
    <div className="useraccount__unsubscribe">
      <p className="useraccount__unsubscribe-text">
        If you wish to stop receiving notifications, simply click the
        unsubscribe button.
      </p>
      <Button className="useraccount__unsubscribe-button button">
        Unsubscribe
      </Button>
    </div>
  );
}

export default UserAccountUnsubscribe;
