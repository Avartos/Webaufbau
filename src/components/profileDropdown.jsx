import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import { Link } from "react-router-dom";

const ProfileDropdown = (props) => {
  //state = {};

  return (
    <div className="wrapperButton">
      <Link to="/login">
        <ProfileIcon className="headerButton" />
      </Link>
    </div>
  );
};
export default ProfileDropdown;
