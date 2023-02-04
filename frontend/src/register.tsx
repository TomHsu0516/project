import React, { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleRegister = async () => {
    const newUser = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    const result = await response.json();

    if (response.status === 200) {
      navigate("/login");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <input onChange={handleChange} placeholder="email" name="email" />
      <input onChange={handleChange} placeholder="pasword" name="password" />
      <button onClick={handleRegister}>Register</button>
      <div style={{ color: "red" }}>{errorMessage}</div>
    </div>
  );
};

export default Register;
