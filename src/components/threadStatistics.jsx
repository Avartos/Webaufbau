import React from "react";

const ThreadStatistics = ({
  numberOfPosts,
  lastPoster,
  lastPostDate,
  createdAt,
}) => {
  return (
    <div className="threadStatistics">
      <p>
        Antworten: <span>{numberOfPosts}</span>
      </p>
      <p>
        Erstellt am: <span>{createdAt}</span>
      </p>
      <p>
        Letzter Post von: <span className="user">{lastPoster}</span>
      </p>
      <p>
        Letzter Post am: <span>{lastPostDate}</span>
      </p>
    </div>
  );
};

export default ThreadStatistics;
