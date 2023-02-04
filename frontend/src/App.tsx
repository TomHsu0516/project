import React, { FC, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./homepage";
import Login from "./login";
import Register from "./register";
import { UserContext } from "./userContext";

const App: FC = () => {
  const [user, setUser] = useState({});
  return (
    <Routes>
      <Route
        path="homepage"
        element={
          <UserContext.Provider value={{ user, setUser }}>
            <HomePage />
          </UserContext.Provider>
        }
      />
      <Route
        path="login"
        element={
          <UserContext.Provider value={{ user, setUser }}>
            <Login />
          </UserContext.Provider>
        }
      />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default App;
