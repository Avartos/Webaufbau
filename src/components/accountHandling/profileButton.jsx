import { ReactComponent as AvatarFrame } from "../../assets/icons/avatarFrame.svg";
import { useState, useEffect } from "react";
import React from "react";

import ProfileDropDown from "./profileDropdown";
// import ProfileDropdown from "../profileDropdown";

const ProfileButton = (props) => {
  return (
    <React.Fragment>
      <div className="wrapperButton">
        <div
          className="profileDropDownButton"
          onClick={() => props.handleToggleUnfold()}
        >
          <img
            src={`http://localhost:3001/profile_pictures/${props.profilePicturePath}`}
            alt="Avatar"
            className="avatar"
          />
          <AvatarFrame className="avatarFrame"></AvatarFrame>
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
