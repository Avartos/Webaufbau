import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import { Link } from "react-router-dom";

/**
 * This component is used to provide a simple button to logi in, when broiwsing the website without beeing logged in
 */
const LoginButton = (props) => {
  return (
    <div className="wrapperButton">
      <Link to="/login" title="Anmelden">
        <ProfileIcon className="headerButton" />
      </Link>
    </div>
  );
};
export default LoginButton;
