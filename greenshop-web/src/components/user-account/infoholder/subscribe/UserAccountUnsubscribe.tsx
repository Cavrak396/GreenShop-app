// import { useUser } from "../../../../context/AuthContext";
// import Button from "../../../../reusable/button/Button";
// import { ConfirmationTypes } from "../../../../reusable/types/confirmationTypes";

// function UserAccountUnsubscribe({ setIsAppear }: ConfirmationTypes) {
//   const { user } = useUser();
//   const isSubscribed = user?.isSubscribed ?? false;

//   const handleClick = () => {
//     setIsAppear(true);
//   };

//   const message = isSubscribed
//     ? "If you wish to stop receiving notifications, simply click the unsubscribe button."
//     : "You're currently unsubscribed. Click the button below to start receiving notifications.";

//   return (
//     <div className="useraccount__unsubscribe">
//       <p className="useraccount__unsubscribe-text">{message}</p>
//       <Button
//         className="useraccount__unsubscribe-button button"
//         onClick={handleClick}
//       >
//         {isSubscribed ? "Unsubscribe" : "Subscribe"}
//       </Button>
//     </div>
//   );
// }

// export default UserAccountUnsubscribe;
