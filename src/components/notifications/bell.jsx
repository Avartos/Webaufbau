import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import React, { useState, useEffect } from "react";
import NotificationList from "./notificationList";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

/**
 * This component is used to control notifications
 * It automatically fetches for new notifications (every 5 minutes)
 * @param {*} props
 * @returns
 */
const Bell = (props) => {
  //two separate notification arrays since there can be twi different types of notifications
  const [threadNotifications, setThreadNotifications] = useState([]);
  const [forumNotifications, setForumNotifications] = useState([]);

  const [notificationListHeight, setNotificationListHeight] = useState(0);
  const notificationListRef = React.useRef(null);

  const calculateNotificationListHeight = () => {
    const height = props.isUnfolded ? 300 : 0;
    setNotificationListHeight(height);
  };

  const fetchNotifications = (url, fetchThreads) => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    fetch(url, {
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
        // undefined, if the user is not looged in
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(
            "Fehler beim Abrufen der Benachrichtigungen! Bitte versuchen Sie es später erneut."
          );
        }
        return res.json();
      })
      .then((data) => {
        if (fetchThreads === true) {
          setThreadNotifications(data);
        } else {
          setForumNotifications(data);
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
        }
      });
    return () => console.log(abortController.abort());
  };

  const fetchForumNotifications = () => {
    fetchNotifications(
      `http://localhost:3001/api/forums/subscriptions/new`,
      false
    );
  };

  const fetchThreadNotifications = () => {
    fetchNotifications(
      `http://localhost:3001/api/threads/subscriptions/new`,
      true
    );
  };

  //used to fetch notifications initially and start the interval to fetch after 5 minutes
  useEffect(() => {
    fetchForumNotifications();
    fetchThreadNotifications();
    //refresh notifications automatically after 5 minutes
    const interval = setInterval(() => {
      fetchForumNotifications();
      fetchThreadNotifications();
    }, 300000);
  }, []);

  const updateNotification = (url, targetFetch) => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    fetch(url, {
      signal: abortController.signal,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // undefined, if the user is not looged in
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(
            "Fehler beim Abrufen der Threads! Bitte versuchen Sie es später erneut."
          );
        }
        return res.json();
      })
      .then((data) => {
        targetFetch();
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
        }
      });
    return () => console.log(abortController.abort());
  };

  const handleMarkForumAsRead = (forumId) => {
    updateNotification(
      `http://localhost:3001/api/forums/subscriptions/${forumId}`,
      fetchForumNotifications
    );
  };
  const handleMarkThreadAsRead = (threadId) => {
    updateNotification(
      `http://localhost:3001/api/threads/subscriptions/${threadId}`,
      fetchThreadNotifications
    );
  };

  //used to show and hide the pulsating notification icon
  const notificationClass = classNames({
    visible:
      threadNotifications.length !== 0 || forumNotifications.length !== 0,
    notificationIndicator: true,
  });

  return (
    <React.Fragment>
      <div className="wrapperButton">
        <div className={notificationClass}></div>

        <BellIcon
          className={"headerButton"}
          onClick={() => props.handleToggleUnfold()}
        />
      </div>
      <div
        className="notificationsUnfoldable"
        style={{ height: notificationListHeight }}
      >
        <CSSTransition
          in={props.isUnfolded}
          timeout={500}
          unmountOnExit
          onEnter={calculateNotificationListHeight}
          onExit={calculateNotificationListHeight}
          nodeRef={notificationListRef}
        >
          <div ref={notificationListRef}>
            <NotificationList
              threadNotifications={threadNotifications}
              forumNotifications={forumNotifications}
              handleMarkForumAsRead={handleMarkForumAsRead}
              handleMarkThreadAsRead={handleMarkThreadAsRead}
            ></NotificationList>
          </div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};

export default Bell;
