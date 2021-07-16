import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@material-ui/icons/Close";

import config from "../../core/config";
import helper from "../../core/helperFunctions";

/**
 * This component represents a single notification within the notification list
 * @param {*} props
 * @returns
 */
const NotificationEntry = (props) => {
  const entryRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  //used to animate the movement of the notification to the right side after marked as read
  const [transformPositon, setTransformPosition] = useState(0);
  //used to animate the height of the notification to make it look like the notifications below move upwards
  const [notificationHeight, setNotificationHeight] = useState(0);

  //calculates the new height of the notification depending on its actual content height
  const calculateEntryHeight = () => {
    const height = isVisible ? 50 : 0;
    setNotificationHeight(height);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(calculateEntryHeight, [props]);

  return (
    <div
      className="notification"
      ref={entryRef}
      style={{
        transform: `translate(${transformPositon}px, 0px)`,
        height: notificationHeight,
      }}
    >
      <CSSTransition
        in={isVisible}
        timeout={500}
        unmountOnExit
        // remove the notification from the list after the timeout elapsed
        onExited={() => {
          props.handleMarkAsRead(props.id);
        }}
        // start the exit animation
        onExit={() => {
          setTransformPosition(700);
          calculateEntryHeight();
        }}
        // set the initial height
        onEnter={() => {
          calculateEntryHeight();
        }}
        nodeRef={entryRef}
        className="notificationFader"
      >
        <React.Fragment>
          <span className="preText">{props.preText}</span>
          <Link to={props.targetUrl} onClick={() => setIsVisible(false)}>
            <span className="title" title={props.title}>
              {helper.shortenString(
                props.title,
                config.shortenedNotificationLength,
                "..."
              )}
            </span>
          </Link>

          <CloseIcon
            className="closeIcon"
            onClick={() => setIsVisible(false)}
          ></CloseIcon>
        </React.Fragment>
      </CSSTransition>
    </div>
  );
};

export default NotificationEntry;
