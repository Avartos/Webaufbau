import React from "react";

/**
 * This component is used to display thread information in table-form (without native table tag)
 */
const ThreadStatistics = ({
  numberOfPosts,
  lastPoster,
  lastPostDate,
  createdAt,
}) => {
  return (
    <div className="threadStatistics">
      <div className="row">
        <span>Antworten:</span>
        <span className="highlighted">{numberOfPosts}</span>
      </div>
      <div className="row">
        <span>Erstellt am:</span>
        <span>{createdAt}</span>
      </div>
      <div className="row">
        <span>Letzter Post von:</span>
        <span className="user">{lastPoster}</span>
      </div>
      <div className="row">
        <span>Letzter Post am:</span>
        <span className="highlighted">{lastPostDate}</span>
      </div>
    </div>
  );
};

export default ThreadStatistics;
