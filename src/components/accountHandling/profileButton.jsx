import {default as AvatarFrame} from "../../assets/icons/avatarFrame.svg";
import React from "react";
import config from "../../core/config";

import ProfileDropDown from "./profileDropdown";

/**
 * This component is used to unfold the profile options inside the navbar
 * @param {*} props
 */
const ProfileButton = (props) => {
  return (
    <React.Fragment>
      <div className="wrapperButton">
        <div
          className="profileDropDownButton"
          onClick={() => props.handleToggleUnfold()}
        >
          <img
            src={`${config.serverPath}/profile_pictures/${props.profilePicturePath}`}
            alt="Avatar"
            className="avatar"
          />
          <img src={AvatarFrame}  className="avatarFrame" alt="" />
        </div>
      </div>
      <ProfileDropDown
        isUnfolded={props.isUnfolded}
        handleToggleUnfold={props.handleToggleUnfold}
      ></ProfileDropDown>
    </React.Fragment>
  );
};

export default ProfileButton;
