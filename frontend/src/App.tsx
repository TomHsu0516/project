import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./homepage";
import Login from "./login";

const App: FC = () => {
  return (
    <Routes>
      <Route path="homepage" element={<HomePage />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
