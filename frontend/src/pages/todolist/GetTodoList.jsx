import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import DrawIcon from "@mui/icons-material/Draw";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Stack, Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthUser from "../AuthUser";
import Navigation from "../../components/navigation";
import DialogBox from "../../components/DialogBox";

const GetTodoList = () => {
  const { http } = AuthUser();
  const [notes, setNotes] = useState([]);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  const getNotes = async () => {
    try {
      const response = await http({
        method: "GET",
        url: "todo/",
      });
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      const response = await http.delete(`/todo/delete/${id}`);
      if (response.data) {
        setDeleteNoteId(null);
        getNotes();
        toast.success("List Deleted Successfully!");
      }
    } catch (error) {
      toast.error("List Deletion Failed!");
    }
  };

  return (
    <div className="container">
      <Navigation />
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
                      <Link onClick={() => setDeleteNoteId(note.id)}>
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
      {deleteNoteId && (
        <DialogBox
          noteId={deleteNoteId}
          handleDeleteNote={handleDeleteNote}
          setDeleteNoteId={setDeleteNoteId}
        />
      )}
    </div>
  );
};

export default GetTodoList;
