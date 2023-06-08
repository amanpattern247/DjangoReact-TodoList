import React from "react";
import { useTheme } from "@mui/material/styles";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ noteId, handleDeleteNote, setDeleteNoteId }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setDeleteNoteId(null);
  };

  const handleConfirm = async () => {
    await handleDeleteNote(noteId);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(8),
          },
        }}
      >
        <DialogTitle>{"Confirm to Delete!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do You Want To Delete This List?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
