import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as SplatIcon } from "../assets/icons/splat.svg";
import FavThreadList from "./favThreadList";

const FavList = (props) => {
  

  return (
    <div className="favList">
      <ul>
        <div className="title">
          <SplatIcon className="splatIcon" />
          <span>{props.className}</span>
        </div>
        {props.list.map((item) => {
          return (
            <FavThreadList item={item} key={item.key}></FavThreadList>
          );
        })}
      </ul>
    </div>
  );
};
export default FavList;
