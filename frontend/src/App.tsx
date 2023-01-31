import React, { FC, useState, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Task } from "./interfaces";
import TodoTask from "./components/TodoTask/TodoTask";

const App: FC = () => {
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

  const addTask = (): void => {
    if (!taskName || !description) {
      window.alert("you cannot add a task with an empty name/description");
      return;
    }
    const newTask = { name: taskName, description: description };
    setTodoList([...todoList, newTask]);
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

export default App;
