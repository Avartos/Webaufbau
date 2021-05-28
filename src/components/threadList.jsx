import React from "react";
import { useState } from "react";
import Thread from "./thread";

const ThreadList = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      subject: "Ein erster Thread",
      body: "Hier könnte Ihre Werbung stehen",
      createdAt: "11.11.2011",
      numberOfPosts: 10,
      lastPoster: "Squid1701",
      lastPostDate: "12.11.2011",
      isSubscribed: false,
    },
  ]);

  const handleSubscribeThread = (id) => {
    let changedThreads = threads;
    let indexToUpdate = changedThreads.findIndex((thread) => {
      return thread.id === id;
    });
    changedThreads[indexToUpdate].isSubscribed =
      !changedThreads[indexToUpdate].isSubscribed;
    setThreads(changedThreads);
  };

  return (
    <React.Fragment>
      {threads.map((thread) => {
        return (
          <Thread
            key={thread.id}
            id={thread.id}
            subject={thread.subject}
            body={thread.body}
            createdAt={thread.createdAt}
            numberOfPosts={thread.numberOfPosts}
            lastPoster={thread.lastPoster}
            lastPostDate={thread.lastPostDate}
            isSubscribed={thread.isSubscribed}
            handleSubscribeThread={handleSubscribeThread}
          />
        );
      })}
    </React.Fragment>
  );
};

export default ThreadList;
