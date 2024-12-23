import Title from "../../../reusable/titles/Title";
import ProfilePhoto from "../../../assets/images/account/user.png";

function UserAccountInfo() {
  return (
    <div className="useraccount__profile-info">
      <img
        src={ProfilePhoto}
        alt="profile photo"
        className="useraccount__profile-photo"
      />
      <Title className="useraccount__profile-title small-title">
        Marko Cavrak
      </Title>
      <span className="useraccount__profile-mail">
        cavrakmarko396@gmail.com
      </span>
    </div>
  );
}

export default UserAccountInfo;
