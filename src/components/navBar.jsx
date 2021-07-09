import React from 'react';
import SearchBar from "./searchBar";
import Bell from "./notifications/bell";
import ProfileDropdown from "./profileDropdown";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../assets/icons/logo.svg";
import "../assets/css/_navBar.scss";

const NavBar = () => {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li className="left">
            <label htmlFor="favToggle" className="favToggleLabel">
              ☰
            </label>
          </li>
          <li>
          {sessionStorage.getItem("accessToken") && <Bell />}
          </li>
          <li>
            <ProfileDropdown />
          </li>
        </ul>

        <Link to="/" className="wrapperLogo">
          <LogoIcon className="websiteLogo" />
        </Link>
        <SearchBar />
      </nav>
    </React.Fragment>
  );
};
export default NavBar;
