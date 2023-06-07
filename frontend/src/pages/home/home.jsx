import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation";

const Home = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="mt-5 p-5 bg-light">
        <h1 className="display-4">Welcome to Todo List</h1>
        <p className="lead">
          This is a wonderful application for manage Todo List in React and
          Django.
        </p>
        <hr className="my-4" />
        <p>Click the button below to View Notes.</p>
        <Link className="btn btn-primary btn-lg" to="/notes">
          Notes
        </Link>
      </div>
    </div>
  );
};

export default Home;
