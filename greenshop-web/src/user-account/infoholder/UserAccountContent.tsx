import { useState } from "react";
import UserAccountLogout from "./logout/UserAccountLogout";
import UserAccountProfile from "./profile/UserAccountProfile";
import UserAccountSubscribe from "./subscribe/UserAccountSubscribe";
import Portal from "../../reusable/Portal/Portal";
import ConfirmationContent from "../../reusable/Confirmation/ConfirmationContent";
import { useUser } from "../../context/AuthContext";

function UserAccountContent({ isActive }: { isActive: number }) {
  const { logout } = useUser();

  const [isAppear, setIsAppear] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(
    null
  );

  return (
    <div className="useraccount__content">
      {isActive === 1 && <UserAccountProfile setIsAppear={setIsAppear} />}
      {isActive === 2 && <UserAccountSubscribe setIsAppear={setIsAppear} />}
      {isActive === 3 && (
        <UserAccountLogout
          setIsAppear={setIsAppear}
          setOnConfirmAction={setOnConfirmAction}
          logout={logout}
        />
      )}
      {isAppear && (
        <Portal setIsAppear={setIsAppear}>
          <ConfirmationContent
            type="unsubscribe"
            setIsAppear={setIsAppear}
            onConfirmAction={onConfirmAction}
            message="Are you sure about this action, this action can change your current status?"
          />
        </Portal>
      )}
    </div>
  );
}

export default UserAccountContent;
