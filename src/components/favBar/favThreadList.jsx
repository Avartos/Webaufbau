import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import classNames from "classnames";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Link} from "react-router-dom";

import config from "../../core/config";
import helper from "../../core/helperFunctions";

const FavThreadList = ({forum}) => {
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
            <li className="favForum">
        <span onClick={handleToggleUnfolded}>
          <ArrowForwardIosIcon className={dropDownClass}/>
          <span className="forumTitle" title={forum.title}>
            {helper.shortenString(
                forum.title,
                config.favBarStringLength,
                "..."
            )}
          </span>
        </span>
                <div style={{height: threadListHeight}}>
                    <CSSTransition
                        in={isUnfolded}
                        timeout={500}
                        unmountOnExit
                        onEnter={calculateThreadListHeight}
                        onExit={calculateThreadListHeight}
                        nodeRef={threadListRef}
                    >
                        <ul ref={threadListRef}>
                            {forum.threads.map((thread) => {
                                return (
                                    <li className="favThread" key={`favThread${thread.id}`}>
                                        <Link
                                            to={`/contributions/${thread.id}`}
                                            title={thread.title}
                                        >
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
                    </CSSTransition>
                </div>
            </li>
        </React.Fragment>
    );
};

export default FavThreadList;
