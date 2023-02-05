import React, { FC, useState, ChangeEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { LocalUser, Task } from "./interfaces";
import TodoTask from "./components/TodoTask/TodoTask";

const HomePage: FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();
  const localUser: LocalUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    console.log(localUser);
    let id: string;

    if (localUser) {
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
    let localUser: LocalUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!taskName || !description) {
      window.alert("you cannot add a task with an empty name/description");
      return;
    }
    const id = (tasks.length + 1).toString();
    const newTask = { id: id, name: taskName, description: description };
    setTasks([...tasks, newTask]);
    if (localUser) {
      await fetch(`http://localhost:8000/user/${localUser.id}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    }

    setTaskName("");
    setDescription("");
  };

  const updateTasksAfterDeletion = (taskId: string): void => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== taskId;
      })
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

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
          value={taskName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>
      <button onClick={addTask}>Add</button>
      <div className="todoList">
        {tasks.map((task: Task, key: number) => {
          return (
            <TodoTask
              key={key}
              task={task}
              updateTasksAfterDeletion={updateTasksAfterDeletion}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
