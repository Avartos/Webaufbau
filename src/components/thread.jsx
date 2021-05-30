import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import PreviewList from "./previewList";
import SubscribeButton from "./subscribeButton";
import ThreadStatistics from "./threadStatistics";
import { ReactComponent as CallIcon } from "../icons/voiceCall.svg";


const Thread = ({
  id,
  subject,
  body,
  createdAt,
  numberOfPosts,
  lastPoster,
  lastPostDate,
  isSubscribed,
  handleSubscribeThread,
  isUnfolded,
  handleTogglePreview,
  posts,
}) => {
  const [previewHeight, setPreviewHeight] = useState(0);
  const calculatePreviewHeight = (element) => {
    const height = (previewHeight === 0) ? element.offsetHeight : 0;
    setPreviewHeight(height);
  };

  return (
    <div className="thread">
      <div className="threadHeader">
        <span className="threadTitle">Thread: {subject}</span>
        <CallIcon className="callButton"></CallIcon>
        <SubscribeButton
          parentId={id}
          isSubscribed={isSubscribed}
          handleSubscribe={handleSubscribeThread}
        />
      </div>
      <div className="threadBody">
        <p className="shortDescription">{body}</p>
        <ThreadStatistics
          createdAt={createdAt}
          numberOfPosts={numberOfPosts}
          lastPoster={lastPoster}
          lastPostDate={lastPostDate}
        />
      </div>

      {posts.length > 0 && (
        <React.Fragment>
          <button
            onClick={() => handleTogglePreview(id)}
            className="loadMoreButton"
          >
            {isUnfolded && <span>-</span>}
            {!isUnfolded && <span>+</span>}
          </button>
          <div className="threadFooter" style={{ height: previewHeight }}>
            <CSSTransition
              in={isUnfolded}
              timeout={500}
              unmountOnExit
              onEnter={calculatePreviewHeight}
              onExit={calculatePreviewHeight}
            >
              <PreviewList key={id} posts={posts} />
            </CSSTransition>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Thread;
