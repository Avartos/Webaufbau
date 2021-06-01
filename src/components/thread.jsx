import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import PreviewList from "./previewList";
import SubscribeButton from "./subscribeButton";
import ThreadStatistics from "./threadStatistics";
import { ReactComponent as CallIcon } from "../icons/voiceCall.svg";

const Thread = (props) => {
  const [previewHeight, setPreviewHeight] = useState(0);
  const calculatePreviewHeight = (element) => {
    const height = previewHeight === 0 ? element.offsetHeight : 0;
    setPreviewHeight(height);
  };

  return (
    <div className="thread">
      <div className="threadHeader">
        <span className="threadTitle">Thread: {props.subject}</span>
        <div className="buttonWrapper">
          <CallIcon className="callButton"></CallIcon>
        </div>
        <div className="buttonWrapper">
          <SubscribeButton
            parentId={props.id}
            isSubscribed={props.isSubscribed}
            handleSubscribe={props.handleSubscribeThread}
          />
        </div>
      </div>
      <div className="threadBody">
        <p className="shortDescription">{props.body}</p>
        <ThreadStatistics
          createdAt={props.createdAt}
          numberOfPosts={props.numberOfPosts}
          lastPoster={props.lastPoster}
          lastPostDate={props.lastPostDate}
        />
      </div>

      {props.posts.length > 0 && (
        <React.Fragment>
          <button
            onClick={() => props.handleTogglePreview(props.id)}
            className="loadMoreButton"
          >
            {props.isUnfolded && <span>-</span>}
            {!props.isUnfolded && <span>+</span>}
          </button>
          <div className="threadFooter" style={{ height: previewHeight }}>
            <CSSTransition
              in={props.isUnfolded}
              timeout={500}
              unmountOnExit
              onEnter={calculatePreviewHeight}
              onExit={calculatePreviewHeight}
            >
              <PreviewList key={props.id} posts={props.posts} />
            </CSSTransition>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Thread;
