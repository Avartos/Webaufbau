import React from "react";
import { CircularProgress } from "@material-ui/core";

const LoadingCircle = ({isActive, loadingText}) => {
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
}
 
export default LoadingCircle;