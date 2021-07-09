import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@material-ui/icons/Close";

const NotificationEntry = (props) => {
  const entryRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const [transformPositon, setTransformPosition] = useState(0);
  const [notificationHeight, setNotificationHeight] = useState();

  const calculateEntryHeight = () => {
    const height = isVisible ? entryRef.current.clientHeight : 0;
    setNotificationHeight(height);
  };

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
        onExited={() => {
          props.handleMarkAsRead(props.id);
        }}
        onExit={() => {
          setTransformPosition(700);
          calculateEntryHeight();
        }}
        onEnter={() => {
          calculateEntryHeight();
        }}
        nodeRef={entryRef}
        className="notificationFader"
      >
        <React.Fragment>
          <span className="preText">{props.preText}</span>
          <Link to={props.targetUrl} onClick={() => setIsVisible(false)}>
            <span className="title">{props.title}</span>
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
