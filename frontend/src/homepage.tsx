import React, { FC, useState, ChangeEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Task } from "./interfaces";
import TodoTask from "./components/TodoTask/TodoTask";
import { UserContext } from "./userContext";

interface LocalUser {
  id: string;
  email: string;
  token: string;
}

const HomePage: FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    let localUser: LocalUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(localUser);
    let id: string;

    if (localUser) {
      setUser(localUser);
      id = localUser.id;

      const fetchAPI = async () => {
        let response = await fetch(`http://localhost:8000/user/${id}/task`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localUser.token,
          },
        });

        if (response.status === 200) {
          const userTasks = await response.json();
          setTasks(userTasks);
        } else {
          setErrorMessage(response.statusText);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      };

      fetchAPI();
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "task") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  const addTask = async () => {
    if (!taskName || !description) {
      window.alert("you cannot add a task with an empty name/description");
      return;
    }
    const newTask = { name: taskName, description: description };
    setTasks([...tasks, newTask]);

    await fetch(`http://localhost:8000/user/${user.id}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return errorMessage ? (
    <div>{errorMessage}</div>
  ) : (
    <div className="App">
      <button onClick={handleLogout}>Log Out</button>
      <div className="header">
        <h1>TODO List App</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Task"
          name="task"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
      </div>
      <button onClick={addTask}>Add</button>
      <div className="todoList">
        {tasks.map((task: Task, key: number) => {
          return <TodoTask key={key} task={task} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
