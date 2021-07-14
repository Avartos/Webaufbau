import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../core/config";
import helper from "../core/helperFunctions";

import ForumStatictics from "./forumStatistics";
import SubscribeButton from "./subscribeButton";

/**
 * This component represents a single forum that can be listed inside the forumList component
 * @param {*} props
 * @returns jsx for a single thread
 */
const Forum = (props) => {
  //used to set a date if none is given
  const [updatedAt, setUpdatedAt] = useState (); 

  //checks if the usser is logged in
  const isLoggedIn = () => {
    return sessionStorage.getItem('accessToken')!==null;
  }

  //sets updatedAt to createdAt if updatedAt doesnt exist
  const isUpdateSet = () => {
    setUpdatedAt(props.updatedAt !== null ? props.updatedAt : props.createdAt);
  }

  useEffect(isUpdateSet)

  return (
    <div className="forum">
      <div className="header">
          <Link className="title" to={`/threads/${props.id}`}>Forum: {helper.shortenString(props.name, config.shortenedTitleLength, '...')}</Link>
        <div className="wrapperButton">
          {isLoggedIn() && <SubscribeButton
            parentId={props.id}
            isSubscribed={props.subscriptionUsersId}
            handleSubscribe={props.handleSubscribeForum}
          />}
        </div>
      </div>
      <div className="body">
        <p className="shortDescription">{helper.shortenString(props.description, config.shortenedDescriptionLength, '...')}</p>
        <ForumStatictics
          numberOfThreads={props.numberOfThreads}
          createdAt={props.createdAt}
          updatedAt={updatedAt}
        />
      </div>
    </div>
  );
};

export default Forum;