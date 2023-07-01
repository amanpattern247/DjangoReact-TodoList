import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import { Stack, Switch } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthUser from "../AuthUser";
import Navigation from "../../components/navigation";

const UpdateTodoList = () => {
  const { http } = AuthUser();
  const { id } = useParams();

  const [note, setNote] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const getNote = async () => {
    try {
      const response = await http.get(`/todo/update/${id}`);
      setNote(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNote();
  }, [id]);

  const handleUpdateNote = async () => {
    try {
      await http.patch(`/todo/update/${id}`, note);
      toast.success("List Updated Successfully!");
    } catch (error) {
      toast.error("List Updated Failed!");
    }
  };

  return (
    <div className="container">
      <Navigation />
      <ToastContainer theme="colored" />
      <div className="single-note">
        <Stack direction="column" alignItems="center" spacing={5}>
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
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
          <Switch
            checked={note.completed}
            onChange={(e) => setNote({ ...note, completed: e.target.checked })}
          />
          <Button variant="outlined" onClick={handleUpdateNote}>
            Update
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default UpdateTodoList;
