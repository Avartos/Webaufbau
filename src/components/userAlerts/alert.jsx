import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import React, { useState } from "react";

/**
 * This component represents a single alert.
 * An alert is displayed on the top right corner of the screen
 */
const AlertItem = ({ alert, handleRemoveAlert }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    handleRemoveAlert(alert.id)
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <MuiAlert elevation={6} severity={alert.severity} onClose={handleClose}>
        {/* Only display the alert title, if an alert title exists */}
        {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
        {alert.body}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertItem;
