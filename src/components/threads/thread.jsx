import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import {Link} from 'react-router-dom';

import PreviewList from "./previewList";
import SubscribeButton from "../subscribeButton";
import ThreadStatistics from "./threadStatistics";
import { ReactComponent as CallIcon } from "../../assets/icons/voiceCall.svg";

const Thread = (props) => {
  const [previewHeight, setPreviewHeight] = useState(0);

  //used to reference to the preview list
  const previewRef = React.useRef(null);

  //determines target height of the previewList depending on current unfold State
  const calculatePreviewHeight = () => {
    const height = props.isUnfolded ? previewRef.current.clientHeight : 0;
    setPreviewHeight(height);
  };

  return (
    <div className="thread">
      <div className="header">
        <Link className="title" to={`/contributions/${props.id}`}>
          Thread: {props.subject}
        </Link>
        <div className="wrapperButton">
          <CallIcon className="callButton"></CallIcon>
        </div>
        <div className="wrapperButton">
          <SubscribeButton
            parentId={props.id}
            isSubscribed={props.isSubscribed}
            handleSubscribe={props.handleSubscribeThread}
          />
        </div>
      </div>
      <div className="body">
        <p className="shortDescription">{props.body}</p>
        <ThreadStatistics
          createdAt={props.createdAt}
          numberOfPosts={props.numberOfPosts}
          lastPoster={props.lastPoster}
          lastPostDate={props.lastPostDate}
        />
      </div>

      {props.posts.length > 0 && 
        <React.Fragment>
          <button
            onClick={() => props.handleTogglePreview(props.id)}
            className="loadMoreButton"
          >
            {props.isUnfolded && <span>-</span>}
            {!props.isUnfolded && <span>+</span>}
          </button>

          <div className="wrapperPreview" style={{ height: previewHeight }}>
            <CSSTransition
              in={props.isUnfolded}
              timeout={500}
              unmountOnExit
              onEnter={calculatePreviewHeight}
              onExit={calculatePreviewHeight}
              nodeRef={previewRef}
            >
              <div ref={previewRef}>
                <PreviewList key={props.id} posts={props.posts} />
              </div>
            </CSSTransition>
          </div>
        </React.Fragment>
      }
    </div>
  );
};

export default Thread;