import React from "react";
import { CircularProgress } from "@material-ui/core";

/**
 * This component displays an animated loading circle
 * @param {*} isActive     the circle visible, if true
 * @param {*} loadingText  text that is displayed, if the circle is visible, can be null
 */
const LoadingCircle = ({ isActive, loadingText }) => {
  return (
    <React.Fragment>
      {isActive && (
        <React.Fragment>
          <CircularProgress />
          <p>{loadingText}</p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LoadingCircle;
