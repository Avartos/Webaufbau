import React from "react";
import { useState } from "react";
import Thread from "./thread";
import "../threadList.css";

const ThreadList = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      subject: "Ein erster Thread",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
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
          user: "Squid1701",
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
      ],
    },
    {
      id: 2,
      subject: "Noch ein erster Thread",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
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
          user: "Squid1701",
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
      ],
    },
    {
      id: 3,
      subject: "Ein ersterer Thread",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
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
          user: "Squid1701",
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
      ],
    },
    {
      id: 4,
      subject: "Der ersteste Thread",
      body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
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
          user: "Squid1701",
        },
        {
          id: 1,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 2,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
        },
        {
          id: 3,
          subject: "tehest",
          body: "tehestText",
          user: "Squid1701",
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
    <div className="threadList">
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
    </div>
  );
};

export default ThreadList;
