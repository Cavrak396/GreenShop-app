import UserAccountCopy from "./UserAccountCopy";
import UserAccountDelete from "./UserAccountDelete";
import UserAccountInfo from "./UserAccountInfo";
import { ConfirmationTypes } from "../../../../reusable/types/confirmationTypes";

function UserAccountProfile({
  setIsAppear,
  setOnConfirmAction,
}: ConfirmationTypes) {
  return (
    <div className="useraccount__profile">
      <UserAccountInfo />
      <p className="useraccount__profile-text">
        With your account, you now have access to exclusive discounts and the
        opportunity to stay updated on the latest trends in the world of plants.
        Explore our offers and enjoy selecting the best plants to enrich your
        space.
      </p>
      <UserAccountCopy />
      <UserAccountDelete
        setIsAppear={setIsAppear}
        setOnConfirmAction={setOnConfirmAction}
      />
    </div>
  );
}

export default UserAccountProfile;
