import NotificationEntry from "./notificationEntry";

/**
 * This component represents a list of notifications
 * @param {*} props forum and thread notifications
 * @returns 
 */
const NotificationList = (props) => {
  return (
    <div className="notificationList">
      <div className="header">
        <div className="title">
          <span>Benachrichtigungen</span>
        </div>
      </div>
      <div className="body">
        {props.forumNotifications.length === 0 &&
          props.threadNotifications.length === 0 && (
            <span>Es gibt keine Benachrichtigungen</span>
          )}

        {props.forumNotifications.map((notification) => {
          return (
            <NotificationEntry
              key={notification.usersId + notification.forumsId}
              title={notification.forumTitle}
              targetUrl={`/threads/${notification.forumsId}`}
              handleMarkAsRead={props.handleMarkForumAsRead}
              id={notification.forumsId}
              preText={"Neue Threads in"}
            ></NotificationEntry>
          );
        })}

        {props.threadNotifications.map((notification) => {
          return (
            <NotificationEntry
              key={notification.usersId + notification.threadsId}
              title={notification.threadTitle}
              targetUrl={`/contributions/${notification.threadsId}`}
              handleMarkAsRead={props.handleMarkThreadAsRead}
              id={notification.threadsId}
              preText={"Neue Beiträge in"}
            ></NotificationEntry>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationList;
