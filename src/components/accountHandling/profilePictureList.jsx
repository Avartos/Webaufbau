import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ProfilePicturePreview from "./profilePicturePreview";

const ProfilePictureList = (props) => {
  const [previewHeight, setPreviewHeight] = useState(0);
  const [previewWidth, setPreviewWidth] = useState(0);
  const previewRef = React.useRef(null);

  const calculatePreviewHeight = () => {
    const height = props.isUnfolded ? previewRef.current.clientHeight+30 : 0;
    const width = props.isUnfolded ? previewRef.current.clientWidth+30 : 0;

    setPreviewHeight(height);
    setPreviewWidth(width);
  };

  return (
    <div className="listWrapper" style={{height: previewHeight, width: previewWidth}}>
      <CSSTransition
        in={props.isUnfolded}
        timeout={500}
        unmountOnExit
        onEnter={calculatePreviewHeight}
        onExit={calculatePreviewHeight}
        nodeRef={previewRef}
      >
        <div className="pictureList" ref={previewRef}>
          {props.pictures.map((picture) => {
            return (
              <ProfilePicturePreview
                key={picture.id}
                title={picture.description}
                path={picture.profilePicturePath}
                id={picture.id}
                handleUpdate={props.handleUpdate}
              />
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
};

export default ProfilePictureList;
