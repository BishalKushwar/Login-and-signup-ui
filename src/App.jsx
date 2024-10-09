import React from "react";
import Signup from "./components/Auth/signup";
import Login from "./components/Auth/login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
