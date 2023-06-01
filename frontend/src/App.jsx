import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/users/Login";
import GetTodoList from "./pages/todolist/GetTodoList";

function App() {
  // const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/", {
          withCredentials: true,
        });

        const content = response.data;
        console.log(content);

        // setName(content.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route index Component={Login} />
      <Route path="/notes" Component={GetTodoList} />
    </Routes>
  );
}

export default App;
