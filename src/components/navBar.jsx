import React, { useState } from "react";
import SearchBar from "./searchBar";
import Bell from "./notifications/bell";
import LoginButton from "./loginButton";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../assets/icons/logo.svg";
import ProfileButton from "./accountHandling/profileButton";

const NavBar = (props) => {
  const [notificationsUnfolded, setNotificationsUnfolded] = useState(false);
  const [profileUnfolded, setProfileUnfolded] = useState(false);

  const handleToggleProfileUnfold = () => {
    if (!profileUnfolded) {
      setNotificationsUnfolded(false);
    }
    setProfileUnfolded(!profileUnfolded);
  };

  const handleToggleNotificationsUnfold = () => {
    if (!notificationsUnfolded) {
      setProfileUnfolded(false);
    }
    setNotificationsUnfolded(!notificationsUnfolded);
  };

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
            {sessionStorage.getItem("accessToken") && (
              <Bell
                handleToggleUnfold={handleToggleNotificationsUnfold}
                isUnfolded={notificationsUnfolded}
              />
            )}
          </li>
          <li>
            {!sessionStorage.getItem("accessToken") && <LoginButton />}
            {sessionStorage.getItem("accessToken") && (
              <ProfileButton
                handleToggleUnfold={handleToggleProfileUnfold}
                isUnfolded={profileUnfolded}
                profilePicturePath={props.profilePicturePath}
              ></ProfileButton>
            )}
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
