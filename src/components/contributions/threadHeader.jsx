import React, { useState, useEffect } from "react";
import ThreadStatistics from "../threads/threadStatistics";
import NewContributionForm from "./createContribution";
import ReturnIcon from "../../assets/icons/returnIcon.svg";
import { Link } from "react-router-dom";

import SubscribeButton from "../subscribeButton";
import config from "../../core/config";
import helper from "../../core/helperFunctions";

/**
 * This component represents the thread header which includes the name of the threads, a subscribe button and the statistics
 */
const ThreadHeader = ({
  thread,
  handleAddContribution,
  handleAddAlert,
  handleUpdateFavbar,
}) => {
  //variables to define whether or not the tread is subscribed
  const [isSubscribed, setIsSubscribed] = useState(false);

  //variables to set the date of last post
  const [lastPostDate, setLastPostDate] = useState(thread[0].createdAt);

  // determins the date and user when a new contribution to a thread was made
  const determineLastPostData = () => {
    if (thread[0].contributionCount !== 0) {
      setLastPostDate(thread[0].contributions[0].createdAt);
      setLastPoster(thread[0].contributions[0].user.userName);
    }
  };

  //the username of the last poster, can be either the username of the
  //thread author or the username of the last contribution author
  const [lastPoster, setLastPoster] = useState(thread[0].creatorUserName);

  useEffect(() => {
    determineLastPostData();
    if (thread.length > 0 && thread[0].subscriptionUsersId !== null) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread]);

  //used to subscribe a thread, throws errors if not possible
  const handleSubscribeThread = (id) => {
    const subscribeMethod = isSubscribed ? "DELETE" : "POST";
    fetch(`${config.serverPath}/api/threads/subscriptions/${thread[0].id}`, {
      method: subscribeMethod,
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((req) => {
        if (!req.ok) {
          throw Error("Das Forum konnte nicht abonniert werden.");
        }
        setIsSubscribed(!isSubscribed);
        handleUpdateFavbar();
      })
      .catch((error) => {
        handleAddAlert("error", "Fehler", error.message);
      });
  };

  return (
    <div className="forumHeader">
      <div className="header">
        <h2 className="title">{thread[0].title}</h2>
        <div className="wrapperButton">
          {helper.isLoggedIn() && (
            <SubscribeButton
              parentId={thread.id}
              isSubscribed={isSubscribed}
              handleSubscribe={handleSubscribeThread}
            />
          )}
        </div>
        <Link
          to={`/threads/${thread[0].forumsId}`}
          className="wrapperReturn"
          title="Zur??ck zum Forum"
        >
          <img src={ReturnIcon} alt="zur??ck" />
        </Link>
      </div>
      <div className="body">
        <div className="statistics">
          <ThreadStatistics
            createdAt={thread[0].createdAt}
            numberOfPosts={thread[0].contributionCount}
            lastPoster={lastPoster}
            lastPostDate={lastPostDate}
          />
        </div>
        <p className="shortDescription">{thread[0].content}</p>
      </div>
      {helper.isLoggedIn() && (
        <NewContributionForm handleAddContribution={handleAddContribution} />
      )}
    </div>
  );
};

export default ThreadHeader;
