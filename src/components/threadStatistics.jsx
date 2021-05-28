import React from "react";

const ThreadStatistics = ({
  numberOfPosts,
  lastPoster,
  lastPostDate,
  createdAt,
}) => {
  return (
    <div className="threadStatistics">
      <div className="row"><span>Antworten:</span><span>{numberOfPosts}</span></div>
      <div className="row"><span>Erstellt am:</span><span>{createdAt}</span></div>
      <div className="row"><span>Letzter Post von:</span><span className="user">{lastPoster}</span></div>
      <div className="row"><span>Letzter Post am:</span><span>{lastPostDate}</span></div>
    </div>
  );
};

export default ThreadStatistics;
