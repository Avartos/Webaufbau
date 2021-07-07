import SearchBar from "./searchBar";
import Bell from "./bell";
import ProfileDropdown from "./profileDropdown";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../assets/icons/logo.svg";
import "../assets/css/_navBar.scss";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li className="left">
          <label htmlFor="favToggle" className="favToggleLabel">
            ☰
          </label>
        </li>
        <li>
          <Bell />
        </li>
        <li>
          <ProfileDropdown />
        </li>
      </ul>

      <Link to="/" className="wrapperLogo">
        <LogoIcon className="websiteLogo" />
      </Link>
      <div className="wrapper-nav-middle">
        <SearchBar />
      </div>
    </nav>
  );
};
export default NavBar;
