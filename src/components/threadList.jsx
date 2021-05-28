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
      posts: [
        {
          id: 0,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
      ],
    },
    {
      id: 2,
      subject: "Ein erster Thread",
      body: "Hier könnte Ihre Werbung stehen",
      createdAt: "11.11.2011",
      numberOfPosts: 10,
      lastPoster: "Squid1701",
      lastPostDate: "12.11.2011",
      isSubscribed: false,
      posts: [
        {
          id: 0,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
      ],
    },
    {
      id: 3,
      subject: "Ein erster Thread",
      body: "Hier könnte Ihre Werbung stehen",
      createdAt: "11.11.2011",
      numberOfPosts: 10,
      lastPoster: "Squid1701",
      lastPostDate: "12.11.2011",
      isSubscribed: false,
      posts: [
        {
          id: 0,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
      ],
    },
    {
      id: 4,
      subject: "Ein erster Thread",
      body: "Hier könnte Ihre Werbung stehen",
      createdAt: "11.11.2011",
      numberOfPosts: 10,
      lastPoster: "Squid1701",
      lastPostDate: "12.11.2011",
      isSubscribed: false,
      posts: [
        {
          id: 0,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: 'Squid1701'
        },
      ],
    },
  ]);

  const [unfoldedThreadId, setUnfoldedThreadId] = useState(-1);

  const handleSubscribeThread = (id) => {
    let changedThreads = threads;
    let indexToUpdate = changedThreads.findIndex((thread) => {
      return thread.id === id;
    });
    changedThreads[indexToUpdate].isSubscribed =
      changedThreads[indexToUpdate].isSubscribed === true ? false : true;
    setThreads([...changedThreads]);
  };

  const handleTogglePreview = (id) => {
    let targetThreadId = unfoldedThreadId;
    targetThreadId = targetThreadId === id ? -1 : id;
    setUnfoldedThreadId(targetThreadId);
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
            isUnfolded={thread.id === unfoldedThreadId}
            handleSubscribeThread={handleSubscribeThread}
            handleTogglePreview={handleTogglePreview}
            posts={thread.posts}
          />
        );
      })}
    </React.Fragment>
  );
};

export default ThreadList;
