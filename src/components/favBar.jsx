import React from "react";
import { ReactComponent as SplatIcon } from "../assets/icons/splat.svg";
import FavThreadList from "./favThreadList";
import { Link } from "react-router-dom";

import config from "../core/config";
import helper from "../core/helperFunctions";

const FavBar = (props) => {
  const isLoggedIn = () => {
    return sessionStorage.getItem("accessToken");
  };

  return (
    <React.Fragment>
      <input type="checkbox" id="favToggle" className="favToggle" />
      <div className="favBar">
        {isLoggedIn() && props.favouriteThreads.length > 0 && (
          <div className="favList">
            <ul>
              <div className="title">
                <SplatIcon className="splatIcon" />
                <span>Favoriten</span>
              </div>
              {props.favouriteThreads.map((forum) => {
                return (
                  <React.Fragment key={`favForum${forum.id}`}>
                    {forum.threads.length !== 0 && (
                      <FavThreadList forum={forum} ></FavThreadList>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        )}
        <div className="favList">
          <ul>
            <div className="title">
              <SplatIcon className="splatIcon" />
              <span>Popular</span>
            </div>
            {props.popularThreads.map((thread) => {
              return (
                <li className="favThread" key={`popular${thread.id}`}>
                  <Link to={`/contributions/${thread.id}`} title={thread.title}>
                    <span>
                      {helper.shortenString(thread.title, config.favBarStringLength-3, '...') +
                        " (" +
                        thread.contributionsCount +
                        ")"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="favList">
          <ul>
            <div className="title">
              <SplatIcon className="splatIcon" />
              <span>Latest</span>
            </div>
            {props.latestThreads.map((thread) => {
              return (
                <li className="favThread" key={`latest${thread.id}`}>
                  <Link to={`/contributions/${thread.id}`} title={thread.title}>
                    <span>
                      {helper.shortenString(thread.title, config.favBarStringLength, '...')}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FavBar;
