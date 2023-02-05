import React, { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return window.alert("Please enter a valid email and password.");
    }

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(result));
      setEmail("");
      setPassword("");

      navigate("/homepage");
    } else {
      setErrorMessage(result.message);
    }
  };

  const signupHandler = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Login Page</h1>

      <input onChange={handleChange} placeholder="email" name="email" />
      <input onChange={handleChange} placeholder="pasword" name="password" />
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : <></>}
      <button onClick={handleLogin}>Log In</button>
      <button onClick={signupHandler}>Sign Up</button>
    </div>
  );
};

export default Login;
