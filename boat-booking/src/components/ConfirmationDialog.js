import React from "react";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import { useLocation } from "wouter";

export const ConfirmationDialog = ({ setOpen, open, url }) => {
  const [, setLocation] = useLocation();

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    setLocation(url);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Please confirm if everything is correct?</DialogTitle>

      <DialogActions>
        <Button autoFocus onClick={handleYes}>
          Yes
        </Button>
        <Button onClick={handleNo}>No</Button>
      </DialogActions>
    </Dialog>
  );
};
