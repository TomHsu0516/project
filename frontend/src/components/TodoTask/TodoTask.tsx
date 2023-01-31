import React, { FC, useState, ChangeEvent } from "react";
import { Task } from "../../interfaces";
import "./TodoTask.css";

interface Props {
  task: Task;
}

const TodoTask = ({ task }: Props) => {
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div className="task">
      <div className="content">
        <span>{task.name}</span>
        <span>{task.description}</span>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoTask;
