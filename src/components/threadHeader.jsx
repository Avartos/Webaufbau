import React, { useState, useEffect } from "react";
import ThreadStatistics from "./threads/threadStatistics";
import NewContributionForm from "./createContribution";
import ReturnIcon from "../assets/icons/returnIcon.svg";
import { Link } from "react-router-dom";

import SubscribeButton from "./subscribeButton";

const ThreadHeader = ({
  thread,
  handleAddContribution,
  handleAddAlert,
  handleUpdateFavbar,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [lastPostDate, setLastPostDate] = useState(thread[0].createdAt);

  const determineLastPostData = () => {
    if (thread[0].contributionCount !== 0) {
      setLastPostDate(thread[0].contributions[0].createdAt);
      setLastPoster(thread[0].contributions[0].user.userName);
    }
  };

  useEffect(determineLastPostData, []);

  //the username of the last poster, can be either the username of the
  //thread author or the username of the last contribution author
  const [lastPoster, setLastPoster] = useState(thread[0].creatorUserName);

  useEffect(() => {
    if (thread[0].subscriptionUsersId !== null) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [thread]);

  const userIsLoggedIn = () => {
    return sessionStorage.getItem("accessToken") != null;
  };

  useEffect(() => {
    console.log("Thread", thread);
    if (thread.length > 0 && thread[0].subscriptionUsersId !== null) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [thread]);

  const handleSubscribeThread = (id) => {
    const subscribeMethod = isSubscribed ? "DELETE" : "POST";
    console.log(isSubscribed);
    fetch(`http://localhost:3001/api/threads/subscriptions/${thread[0].id}`, {
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

  const isLoggedIn = () => {
    return (sessionStorage.getItem('accessToken') !== null);
  }

  return (
    <div className="forumHeader">
      <div className="header">
        <h2 className="title">{thread[0].title}</h2>
        <div className="wrapperButton">
          {sessionStorage.getItem("accessToken") && (
            <SubscribeButton
              parentId={thread.id}
              isSubscribed={isSubscribed}
              handleSubscribe={handleSubscribeThread}
            />
          )}
        </div>
        <Link to={`/threads/${thread[0].forumsId}`} className="wrapperReturn" title="Zurück zum Forum">
            {console.log(`/threads/${thread[0].forumsId}`)}
            <img src={ReturnIcon} />
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
      {isLoggedIn() && <NewContributionForm handleAddContribution={handleAddContribution} />}
    </div>
  );
};

export default ThreadHeader;
