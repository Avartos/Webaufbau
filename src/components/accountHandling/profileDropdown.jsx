import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileDropDown = (props) => {
  const history = useHistory();

  const [profileOptionsHeight, setProfileOptionsHeight] = useState(0);
  const profileOptionsRef = React.useRef(null);

  //calculates the new height of the profile options list to animate it with css transitions
  const calculateProfileOptionsHeight = () => {
    const height = props.isUnfolded ? profileOptionsRef.current.clientHeight : 0;
    setProfileOptionsHeight(height);
  };

  const handleLogout = () => {
    //clears token and other data from the session storage
    sessionStorage.clear();
    //refresh page to make sure all components reload the token
    history.push('/');
    history.go(0);
  };

  return (
    <div className="profileDropdown" style={{ height: profileOptionsHeight }}>
      <CSSTransition
        in={props.isUnfolded}
        timeout={500}
        unmountOnExit
        onEnter={calculateProfileOptionsHeight}
        onExit={calculateProfileOptionsHeight}
        nodeRef={profileOptionsRef}
      >
        <div ref={profileOptionsRef}>
          <div className="header">
            <span>Profiloptionen</span>
          </div>
          <div className="body">
            <Link to="/my_profile">
              <span onClick={props.handleToggleUnfold}>Mein Konto</span>
            </Link>
            {sessionStorage.getItem("isAdmin") === '1' && (
              <Link to="/administration">
                <span onClick={props.handleToggleUnfold}>Nutzerverwaltung</span>
              </Link>
            )}
            <Link to="token_request">
              <span onClick={props.handleToggleUnfold}>
                API Token generieren
              </span>
            </Link>
            <span onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ProfileDropDown;
