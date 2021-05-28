import React from "react";
import PreviewList from "./previewList";
import SubscribeButton from "./subscribeButton";
import ThreadStatistics from "./threadStatistics";

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
  return (
    <div className="thread">
      <div className="threadHeader">
        <span className="threadTitle">Thread: {subject}</span>
        <button className="callButton">
          <img src="/images/voiceCall.svg" alt="voiceCall" />
        </button>
        <SubscribeButton
          parentId={id}
          isSubscribed={isSubscribed}
          handleSubscribe={handleSubscribeThread}
        />
      </div>
      <div className="threadBody">
        <p className="shortDescription">{body}</p>
        <ThreadStatistics
          key={id}
          createdAt={createdAt}
          numberOfPosts={numberOfPosts}
          lastPoster={lastPoster}
          lastPostDate={lastPostDate}
        />
      </div>
      {posts.length > 0 && (
        <button
          onClick={() => handleTogglePreview(id)}
          className="loadMoreButton"
        >
          {isUnfolded && <span>-</span>}
          {!isUnfolded && <span>+</span>}
        </button>
      )}
      {isUnfolded && <PreviewList key={id} posts={posts} />}
    </div>
  );
};

export default Thread;
