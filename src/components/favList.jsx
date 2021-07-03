import React from "react";
import { ReactComponent as SplatIcon } from "../assets/icons/splat.svg";

const FavList = (props) => {
  //state = {};

  return (
    <div className="favList">
      <ul>
        <div className="title">
          <SplatIcon className="splatIcon" />
          <span>{props.className}</span>
        </div>
        {/*forEach list*/}
        {props.list.map((item) => {
          return (
            <React.Fragment>
              <input
                type="checkbox"
                id={`forumCheckBox${item.id}`}
                className="checkbox"
              />
              <li className="favForum" key={item.id}>
                <label htmlFor={`forumCheckBox${item.id}`}>
                  <span>{item.forum}</span>
                </label>
                <ul>
                  {/*forEach threads*/}
                  {item.threads.map((thread) => {
                    return (
                      <li className="favThread" key={thread}>
                        {" "}
                        {thread}{" "}
                      </li>
                    );
                  })}
                </ul>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};
export default FavList;
