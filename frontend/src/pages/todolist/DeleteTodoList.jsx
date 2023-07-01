import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthUser from "../AuthUser";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteTodoList = ({ noteId, setDeleteNoteId, getNotes }) => {
  const theme = useTheme();
  const { http } = AuthUser();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setDeleteNoteId(null);
  };

  const handleDeleteNote = async () => {
    try {
      const response = await http.delete(`/todo/delete/${noteId}`);
      console.log(response);
      if (response.data) {
        getNotes();
        handleClose();
        toast.success("List Deleted Successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("List Deletion Failed!");
    }
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
            Do You Want To Delete This Todo List?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteNote}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteTodoList;
