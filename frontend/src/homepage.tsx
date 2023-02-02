import React, { FC, useState, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Task } from "./interfaces";
import TodoTask from "./components/TodoTask/TodoTask";

const HomePage: FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todoList, setTodoList] = useState<Task[]>([]);

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
    setTodoList([...todoList, newTask]);

    await fetch("http://localhost:8000/newTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  return (
    <div className="App">
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
        {todoList.map((task: Task, key: number) => {
          return <TodoTask key={key} task={task} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
