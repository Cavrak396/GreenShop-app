import UserAccountUnsubscribe from "./UserAccountUnsubscribe";

function UserAccountSubscribe() {
  return (
    <div className="useraccount__subscribe">
      <p className="useraccount__subscribe-text useraccount__subscribe-text--modified">
        Subscribe to our newsletter and stay updated with the latest information
        about our plants, special discounts, and exclusive offers! As a
        subscriber, you'll be the first to know about new plant varieties,
        decoration tips, and the latest trends in horticulture. You'll also gain
        access to special promotions available only to our loyal customers. To
        subscribe, simply check the footer of our website and sign up to enjoy
        all the benefits that come with being a subscriber!
      </p>
      <UserAccountUnsubscribe />
    </div>
  );
}

export default UserAccountSubscribe;
