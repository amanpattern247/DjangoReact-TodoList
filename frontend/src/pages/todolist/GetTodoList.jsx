import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import DrawIcon from "@mui/icons-material/Draw";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Stack, Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthUser from "../AuthUser";
import Navigation from "../../components/navigation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GetTodoList = () => {
  const theme = useTheme();
  const { http } = AuthUser();
  const [open, setOpen] = useState(false);
  let [notes, setNotes] = useState([]);

  let getNotes = async () => {
    await http({
      method: "GET",
      url: "todo/",
    })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await http.delete(`/todo/delete/${id}`);
      if (response.data) {
        getNotes();
        toast.success("List Deleted Successfully!");
      }
    } catch (error) {
      toast.error("List Deletion Failed!");
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="container">
      <Navigation />
      <ToastContainer theme="colored" />
      <div className="note-list">
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {note.id}
                  </TableCell>
                  <TableCell>{note.title}</TableCell>
                  <TableCell>{note.description}</TableCell>
                  <TableCell>{note.completed ? "true" : "false"}</TableCell>
                  <TableCell>
                    {new Date(note.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(note.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Link to={`/notes/update/${note.id}`}>
                        <DrawIcon />
                      </Link>
                      {/* <Link onClick={() => handleDeleteNote(note.id)}> */}
                      <Link onClick={handleClickOpen}>
                        <DeleteForeverIcon />
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
          <DialogTitle>{"Alert!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do You Want To Delete This List?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default GetTodoList;
