import React, { useState } from "react";
import SearchBar from "./searchBar";
import Bell from "../notifications/bell";
import LoginButton from "../loginButton";
import { Link } from "react-router-dom";

import ProfileButton from "../accountHandling/profileButton";
import { default as LogoIcon } from "../../assets/icons/logo.svg";

/**
 * This component represent the navigation bar
 */
const NavBar = (props) => {
  const [notificationsUnfolded, setNotificationsUnfolded] = useState(false);
  const [profileUnfolded, setProfileUnfolded] = useState(false);

  //used to unfold/hide the profile options
  //hides the notification list to prevent that both lists are unfolded at the same time
  const handleToggleProfileUnfold = () => {
    if (!profileUnfolded) {
      setNotificationsUnfolded(false);
    }
    setProfileUnfolded(!profileUnfolded);
  };

  //used to unfold/ hide the notifications list
  //hides the profile options list, to prevent that both lists are unfolded at the same time
  const handleToggleNotificationsUnfold = () => {
    if (!notificationsUnfolded) {
      setProfileUnfolded(false);
    }
    setNotificationsUnfolded(!notificationsUnfolded);
  };

  const isLoggedIn = () => {
    return sessionStorage.getItem("accessToken") !== null;
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
            {!isLoggedIn() && <LoginButton />}
            {isLoggedIn() && (
              <ProfileButton
                handleToggleUnfold={handleToggleProfileUnfold}
                isUnfolded={profileUnfolded}
                profilePicturePath={props.profilePicturePath}
              ></ProfileButton>
            )}
          </li>
        </ul>
        <Link to="/" className="wrapperLogo">
          <img className="websiteLogo" src={LogoIcon} alt="" />
        </Link>
        <SearchBar handleSearch={props.handleSearch} />
      </nav>
    </React.Fragment>
  );
};
export default NavBar;
