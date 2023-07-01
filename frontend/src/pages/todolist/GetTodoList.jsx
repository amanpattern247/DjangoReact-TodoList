import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import DrawIcon from "@mui/icons-material/Draw";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Stack, Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow } from "@mui/material";

import AuthUser from "../AuthUser";
import Navigation from "../../components/navigation";
import AddTodoList from "./AddTodoList";
import DeleteTodoList from "./DeleteTodoList";
import UpdateTodoList from "./UpdateTodoList";

const GetTodoList = () => {
  const { http } = AuthUser();
  const [notes, setNotes] = useState([]);
  const [addNoteId, setAddNoteId] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [updateNoteId, setUpdateNoteId] = useState(null);

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

  const handleAddNote = () => {
    setAddNoteId(true);
  };

  const handleDeleteNote = (id) => {
    setDeleteNoteId(id);
  };

  const handleUpdateNote = (id) => {
    setUpdateNoteId(id);
  };

  return (
    <div className="container">
      <Navigation />
      <div className="note-list">
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead className="">
              <TableRow style={{ fontSize: 30 }}>
                <TableCell>
                  <Link onClick={handleAddNote}>
                    <AddBoxIcon />
                  </Link>
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Actions</TableCell>
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
                      <Link onClick={() => handleUpdateNote(note.id)}>
                        <DrawIcon />
                      </Link>
                      <Link onClick={() => handleDeleteNote(note.id)}>
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
      {addNoteId && (
        <AddTodoList getNotes={getNotes} setAddNoteId={setAddNoteId} />
      )}
      {deleteNoteId && (
        <DeleteTodoList
          noteId={deleteNoteId}
          setDeleteNoteId={setDeleteNoteId}
          getNotes={getNotes}
        />
      )}
      {updateNoteId && (
        <UpdateTodoList
          noteId={updateNoteId}
          setUpdateNoteId={setUpdateNoteId}
          getNotes={getNotes}
        />
      )}
    </div>
  );
};

export default GetTodoList;
