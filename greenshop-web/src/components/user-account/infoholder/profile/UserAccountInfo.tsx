import { useUser } from "../../../../context/AuthContext";
import Title from "../../../../reusable/titles/Title";
import ProfilePhoto from "../../../../assets/images/account/user.png";

function UserAccountInfo() {
  const { user } = useUser();

  return (
    <div className="useraccount__profile-info">
      <img
        src={user?.profilePhoto || ProfilePhoto}
        alt="profile photo"
        className="useraccount__profile-photo"
      />
      <Title className="useraccount__profile-title small-title">
        {user?.userName || "No Name Provided"}
      </Title>
      <span className="useraccount__profile-mail">
        {user?.userEmail || "No Email Provided"}
      </span>
    </div>
  );
}

export default UserAccountInfo;
