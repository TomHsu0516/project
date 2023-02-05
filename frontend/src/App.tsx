import React, { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./homepage";
import Login from "./login";
import Register from "./register";
import { Task } from "./interfaces";
// import { Context } from "./context";

const App: FC = () => {
  return (
    // <Context.Provider value={}>
    <Routes>
      <Route path="homepage" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
    // </Context.Provider>
  );
};

export default App;
