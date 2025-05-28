import { useState } from "react";
import UserAccountLogout from "./logout/UserAccountLogout";
import UserAccountProfile from "./profile/UserAccountProfile";
import UserAccountSubscribe from "./subscribe/UserAccountSubscribe";
import Portal from "../../../reusable/portal/Portal";
import ConfirmationContent from "../../../reusable/confirmation/ConfirmationContent";
import { ConfirmationTypes } from "../../../reusable/types/confirmationTypes";

function UserAccountContent({ isActive }: { isActive: number }) {
  const [isAppear, setIsAppear] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(
    null
  );

  const componentsMap: { [key: number]: React.FC<ConfirmationTypes> } = {
    1: UserAccountProfile,
    2: UserAccountSubscribe,
    3: UserAccountLogout,
  };

  const ActiveComponent = componentsMap[isActive];

  return (
    <div className="useraccount__content">
      {ActiveComponent && (
        <ActiveComponent
          setIsAppear={setIsAppear}
          setOnConfirmAction={setOnConfirmAction}
        />
      )}
      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <ConfirmationContent
            message="Are you sure you want to proceed?"
            setIsAppear={setIsAppear}
            onConfirmAction={onConfirmAction}
          />
        </Portal>
      )}
    </div>
  );
}

export default UserAccountContent;