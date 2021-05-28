import React from "react";
import PreviewList from "./previewList";
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
  posts
}) => {

  return (
    <div className="thread">
      <div className="threadHeader">
        <h3 className="threadTitle">{subject}</h3>
        <button onClick={() => handleSubscribeThread(id)}>Abonnieren</button>
        {isSubscribed && <span>Test</span>}
        <button className="callButton">Call beitreten</button>
      </div>
      <div className="threadBody">
        <p className="shortDescription">{subject}</p>
        <ThreadStatistics
          key={id}
          createdAt={createdAt}
          numberOfPosts={numberOfPosts}
          lastPoster={lastPoster}
          lastPostDate={lastPostDate}
        />
      </div>
      <button
        onClick={() => handleTogglePreview(id)}
        className="loadMoreButton"
      >
        {isUnfolded && <span>Reduzieren</span>}
        {!isUnfolded && <span>Mehr...</span>}
      </button>
      {isUnfolded && <PreviewList key={id} posts={posts}/>}
    </div>
  );
};

export default Thread;
