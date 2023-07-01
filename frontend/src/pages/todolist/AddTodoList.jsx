import React from "react";
import { useTheme } from "@mui/material/styles";
import { DialogContent, DialogActions } from "@mui/material";
import { Stack, Slide, Button, TextField } from "@mui/material";
import { FormControlLabel, Switch, Dialog, DialogTitle } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthUser from "../AuthUser";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddTodoList = ({ getNotes, setAddNoteId }) => {
  const theme = useTheme();
  const { http } = AuthUser();
  const [open, setOpen] = React.useState(true);
  const [note, setNote] = React.useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleClose = () => {
    setOpen(false);
    setAddNoteId(false);
  };

  const handleAddNote = async () => {
    try {
      await http.post(`/todo/add`, note); // Use HTTP method "post"
      getNotes();
      handleClose();
      toast.success("List Added Successfully!");
    } catch (error) {
      toast.error("List Add Failed!");
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
            width: 700,
          },
        }}
      >
        <DialogTitle>{"Add Todo List"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              required
              id="standard-required"
              multiline
              fullWidth
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <TextField
              required
              id="standard-required"
              multiline
              fullWidth
              rows={3}
              value={note.description}
              onChange={(e) =>
                setNote({ ...note, description: e.target.value })
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={note.completed}
                  onChange={(e) =>
                    setNote({ ...note, completed: e.target.checked })
                  }
                />
              }
              label="Mark as Complete"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNote}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTodoList;
