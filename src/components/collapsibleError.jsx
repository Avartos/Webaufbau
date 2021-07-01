import React from "react";
import Alert from "@material-ui/lab/Alert";


const CollapsibleError = ({ description }) => {
  return (
    <React.Fragment>
      {/* <Collapse in={description}> */}
      {description && <Alert severity="error">{description}</Alert>}
      {/* </Collapse> */}
    </React.Fragment>
  );
};

export default CollapsibleError;
