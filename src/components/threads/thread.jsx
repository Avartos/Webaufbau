import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import {Link} from 'react-router-dom';

import PreviewList from "./previewList";
import SubscribeButton from "../subscribeButton";
import ThreadStatistics from "./threadStatistics";
import { ReactComponent as CallIcon } from "../../assets/icons/voiceCall.svg";

const Thread = (props) => {
  const [previewHeight, setPreviewHeight] = useState(0);

  //used to reference to the preview list
  const previewRef = React.useRef(null);

  //determines target height of the previewList depending on current unfold State
  const calculatePreviewHeight = () => {
    const height = props.thread.isUnfolded ? previewRef.current.clientHeight : 0;
    setPreviewHeight(height);
  };

  const [lastPostDate, setLastPostDate] = useState(props.thread.createdAt);
  const [lastPoster, setLastPoster] = useState(props.thread.creatorUserName);


  //used to change the last post information, if there are already contributions
  const determineLastPostData = () => {
    if(props.thread.contributionCount !== 0) {
      setLastPostDate(props.thread.contributions[0].createdAt);
      setLastPoster(props.thread.contributions[0].user.userName);
    }
  }

  useEffect(determineLastPostData, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div className="thread">
      <div className="header">
        <Link className="title" to={`/contributions/${props.thread.id}`}>
          Thread: {props.thread.title}
        </Link>
        <div className="wrapperButton">
          <CallIcon className="callButton"></CallIcon>
        </div>
        {sessionStorage.getItem("accessToken") &&
        <div className="wrapperButton">
          <SubscribeButton
            parentId={props.thread.id}
            isSubscribed={props.thread.subscriptionUsersId}
            handleSubscribe={props.handleSubscribe}
          />
        </div>}
      </div>
      <div className="body">
        <p className="shortDescription">{props.thread.content}</p>
        <ThreadStatistics
          createdAt={props.thread.createdAt}
          numberOfPosts={props.thread.contributionCount}
          lastPoster={lastPoster}
          lastPostDate={lastPostDate}
        />
      </div>
      {props.thread.contributionCount > 0 && 
        <React.Fragment>
          <button
            onClick={() => props.handleTogglePreview(props.thread.id)}
            className="loadMoreButton"
          >
            {props.thread.isUnfolded && <span>-</span>}
            {!props.thread.isUnfolded && <span>+</span>}
          </button>

          <div className="wrapperPreview" style={{ height: previewHeight }}>
            <CSSTransition
              in={props.thread.isUnfolded}
              timeout={500}
              unmountOnExit
              onEnter={calculatePreviewHeight}
              onExit={calculatePreviewHeight}
              nodeRef={previewRef}
            >
              <div ref={previewRef}>
                <PreviewList key={props.thread.id} posts={props.thread.posts} />
              </div>
            </CSSTransition>
          </div>
        </React.Fragment>
      }
    </div>
  );
};

export default Thread;