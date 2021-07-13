import React from "react";
import { Link } from "react-router-dom";
import config from "../core/config";
import helper from "../core/helperFunctions";

import ForumStatictics from "./forumStatistics";
import SubscribeButton from "./subscribeButton";

const Forum = (props) => {
  return (
    <div className="forum">
      <div className="header">
        {console.log(props)}
        <span className="title">
          <Link to={`/threads/${props.id}`}>Forum: {helper.shortenString(props.name, config.shortenedTitleLength, '...')}</Link>
        </span>
        <div className="wrapperButton">
          <SubscribeButton
            parentId={props.id}
            isSubscribed={props.isSubscribed}
            handleSubscribe={props.handleSubscribeForum}
          />
        </div>
      </div>
      <div className="body">
        <p className="shortDescription">{helper.shortenString(props.description, config.shortenedDescriptionLength, '...')}</p>
        <ForumStatictics
          numberOfThreads={props.numberOfThreads}
          numberOfComments={props.numberOfComments}
          lastActivityFrom={props.lastActivityFrom}
          lastActivityAt={props.lastActivityAt}
        />
      </div>
    </div>
  );
};

export default Forum;
