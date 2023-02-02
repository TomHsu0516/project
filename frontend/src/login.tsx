import React, { FC } from "react";

import "./App.css";

const Login: FC = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <input placeholder="email" />
      <input placeholder="pasword" />
      <button>log in</button>
      <button>log out</button>
    </div>
  );
};

export default Login;
