import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ProfilePicturePreview from "./profilePicturePreview";

/**
 * This component is used to list all selectable provile icons in a list
 * @param {*} props
 */
const ProfilePictureList = (props) => {
  const [listHeight, setListHeight] = useState(0);
  const [listWidth, setListWidth] = useState(0);
  const listRef = React.useRef(null);

  //used to animate the height and with of the list
  const calculatePreviewHeight = () => {
    const height = props.isUnfolded ? listRef.current.clientHeight + 30 : 0;
    const width = props.isUnfolded ? listRef.current.clientWidth + 30 : 0;

    setListHeight(height);
    setListWidth(width);
  };

  return (
    <div
      className="listWrapper"
      style={{ height: listHeight, width: listWidth }}
    >
      <CSSTransition
        in={props.isUnfolded}
        timeout={500}
        unmountOnExit
        onEnter={calculatePreviewHeight}
        onExit={calculatePreviewHeight}
        nodeRef={listRef}
      >
        <div className="pictureList" ref={listRef}>
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
