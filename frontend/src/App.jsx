import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/home/home";
import Login from "./pages/users/login";
import GetTodoList from "./pages/todolist/GetTodoList";
import PrivateRoute from "./components/PrivateRoute";
import UpdateTodoList from "./pages/todolist/UpdateTodoList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path="/notes" element={<GetTodoList />} />
        <Route path="/notes/update/:id" element={<UpdateTodoList />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
