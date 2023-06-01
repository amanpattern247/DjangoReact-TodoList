import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";

const GetTodoList = () => {
  let [notes, setNotes] = useState([]);

  let getNotes = async () => {
    await axios.get("http://localhost:8000/todo/", {
      withCredentials: true,
    })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {note.id}
                  </TableCell>
                  <TableCell>
                    <Link to={`/notes/${note.id}`}>{note.title}</Link>
                  </TableCell>
                  <TableCell>{note.description}</TableCell>
                  <TableCell>{note.completed ? "true" : "false"}</TableCell>
                  <TableCell>
                    {new Date(note.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(note.updated_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default GetTodoList;
