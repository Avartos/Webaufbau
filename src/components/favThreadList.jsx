import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const FavThreadList = ({ item }) => {
  const [threadListHeight, setThreadListHeight] = useState(0);
  const threadListRef = React.useRef(null);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const calculateThreadListHeight = () => {
    const height = isUnfolded ? threadListRef.current.clientHeight : 0;
    setThreadListHeight(height);
  };

  const handleToggleUnfolded = () => {
    setIsUnfolded(!isUnfolded);
  };

  let dropDownClass = classNames({
    dropDown: true,
    active: isUnfolded,
  });

  return (
    <React.Fragment>
      <li className="favForum" key={item.id}>
        <span onClick={handleToggleUnfolded}>
          <ArrowForwardIosIcon className={dropDownClass} />
          <span className="forumTitle">
            {item.forumTitle}
          </span>
        </span>
        <div style={{ height: threadListHeight }}>
          <CSSTransition
            in={isUnfolded}
            timeout={500}
            unmountOnExit
            onEnter={calculateThreadListHeight}
            onExit={calculateThreadListHeight}
            nodeRef={threadListRef}
          >
            <ul ref={threadListRef}>
              {item.threads.map((value, index) => {
                return <li key={index}>{value.threadTitle}</li>
              })}
            </ul>
          </CSSTransition>
        </div>
      </li>
    </React.Fragment>
  );
};

export default FavThreadList;
