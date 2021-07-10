import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileDropDown = (props) => {
  const history = useHistory();

  const [previewHeight, setPreviewHeight] = useState(0);
  const previewRef = React.useRef(null);

  const calculatePreviewHeight = () => {
    const height = props.isUnfolded ? previewRef.current.clientHeight : 0;
    setPreviewHeight(height);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    //refresh page to make sure all components reload the token
    history.go(0);
  };

  return (
    <div className="profileDropdown" style={{ height: previewHeight }}>
      <CSSTransition
        in={props.isUnfolded}
        timeout={500}
        unmountOnExit
        onEnter={calculatePreviewHeight}
        onExit={calculatePreviewHeight}
        nodeRef={previewRef}
      >
        <div ref={previewRef}>
          <div className="header">
            <span>Profiloptionen</span>
          </div>
          <div className="body">
            <Link to="/my_profile">
              <span onClick={props.handleToggleUnfold}>Mein Konto</span>
            </Link>
            {sessionStorage.getItem("isAdmin") && (
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
