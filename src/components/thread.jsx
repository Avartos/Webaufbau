import React from "react";
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
}) => {
  return (
    <div className="thread">
      <div className="threadHeader">
        <h3 className="threadTitle">{subject}</h3>
        <button onClick={() => handleSubscribeThread(id)}>Abonnieren</button>
        {isSubscribed && <span>Test</span>}
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
    </div>
  );
};

export default Thread;
