import React from "react";
import PreviewList from "./previewList";
import ThreadStatistics from "./threadStatistics";
import classNames from 'classnames';

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

  let subscribeClass = classNames({
    subscribeButton: true,
    active: isSubscribed
  });

  return (
    <div className="thread">
      <div className="threadHeader">
        <span className="threadTitle">{subject}</span>
        <button className="callButton"></button>
        <button onClick={() => handleSubscribeThread(id)} className={subscribeClass}></button>
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
        {isUnfolded && <span>-</span>}
        {!isUnfolded && <span>+</span>}
      </button>
      {isUnfolded && <PreviewList key={id} posts={posts}/>}
    </div>
  );
};

export default Thread;
