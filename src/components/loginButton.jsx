import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import { Link } from "react-router-dom";

const LoginButton = (props) => {
  //state = {};

  return (
    <div className="wrapperButton">
      <Link to="/login" title="Anmelden">
        <ProfileIcon className="headerButton" />
      </Link>
    </div>
  );
};
export default LoginButton;
