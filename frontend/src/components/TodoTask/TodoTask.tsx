import React, { FC, useState, ChangeEvent } from "react";
import { LocalUser, Task } from "../../interfaces";
import "./TodoTask.css";

interface Props {
  task: Task;
  updateTasksAfterDeletion(taskId: string): void;
}

const TodoTask = ({ task, updateTasksAfterDeletion }: Props) => {
  const handleDelete = async (taskId: string) => {
    let localUser: LocalUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser) {
      const response = await fetch(`http://localhost:8000/task/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localUser.token,
        },
      });
      const deletedTask = await response.json();
      console.log("deleted task", deletedTask);
    }
    updateTasksAfterDeletion(taskId);
    console.log("delete");
  };

  return (
    <div className="task">
      <div className="content">
        <span>{task.name}</span>
        <span>{task.description}</span>
      </div>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TodoTask;
