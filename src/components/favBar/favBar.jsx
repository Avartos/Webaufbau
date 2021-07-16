import React from "react";
import {ReactComponent as SplatIcon} from "../../assets/icons/splat.svg";
import FavThreadList from "./favThreadList";
import {Link} from "react-router-dom";

import config from "../../core/config";
import helper from "../../core/helperFunctions";

/**
 * This component represents the favorite bar left on our website.
 * @param props.favouriteThreads = {id INT, threads [{id INT, title STRING}], title STRING}
 */
const FavBar = (props) => {
    // returns null if the user is not logged in
    const isLoggedIn = () => {
        return sessionStorage.getItem("accessToken");
    };

    return (
        <React.Fragment>
            <input type="checkbox" id="favToggle" className="favToggle"/>
            <div className="favBar">
                {/*hide the favorite-section, if the user is not logged in*/}
                {isLoggedIn() && props.favouriteThreads.length > 0 && (

                    // FAVORITE SECTION
                    <div className="favList">
                        <ul>
                            <div className="title">
                                <SplatIcon className="splatIcon"/>
                                <span>Favoriten</span>
                            </div>
                            {
                                props.favouriteThreads.map((forum) => {
                                return (
                                    <React.Fragment key={`favForum${forum.id}`}>
                                        {forum.threads.length !== 0 && (
                                            <FavThreadList forum={forum}></FavThreadList>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/*POPULAR SECTION*/}
                <div className="favList">
                    <ul>
                        <div className="title">
                            <SplatIcon className="splatIcon"/>
                            <span>Popular</span>
                        </div>
                        {props.popularThreads.map((thread) => {
                            return (
                                <li className="favThread" key={`popular${thread.id}`}>
                                    <Link to={`/contributions/${thread.id}`} title={thread.title}>
                    <span>
                      {helper.shortenString(
                          thread.title,
                          config.favBarStringLength - 3,
                          "..."
                      ) +
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

                {/*LATEST SECTION*/}
                <div className="favList">
                    <ul>
                        <div className="title">
                            <SplatIcon className="splatIcon"/>
                            <span>Latest</span>
                        </div>
                        {props.latestThreads.map((thread) => {
                            return (
                                <li className="favThread" key={`latest${thread.id}`}>
                                    <Link to={`/contributions/${thread.id}`} title={thread.title}>
                    <span>
                      {helper.shortenString(
                          thread.title,
                          config.favBarStringLength,
                          "..."
                      )}
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
