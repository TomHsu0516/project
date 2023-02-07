import React, { FC, useState, ChangeEvent } from "react";
import { LocalUser, Task, UpdatedTask } from "../../interfaces";
import "./TodoTask.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  task: Task;
  updateTasksAfterDeletion(taskId: string): void;
  updateTasksAfterEditing(updatedTask: UpdatedTask): void;
}

const TodoTask = ({
  task,
  updateTasksAfterDeletion,
  updateTasksAfterEditing,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [updatedTask, setUpdatedTask] = useState<UpdatedTask>({} as any);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let localUser: LocalUser = JSON.parse(localStorage.getItem("user") || "{}");

  const handleDelete = async (taskId: string) => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "task") {
      setTaskName(value);
      setUpdatedTask((prevTask) => {
        prevTask.name = value;
        return prevTask;
      });
    } else {
      setDescription(value);
      setUpdatedTask((prevTask) => {
        prevTask.description = value;
        return prevTask;
      });
    }
  };

  const handleTaskUpdate = async () => {
    if (localUser) {
      const response = await fetch(`http://localhost:8000/task/${task.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localUser.token,
        },
        body: JSON.stringify(updatedTask),
      });
      const taskUpdated = await response.json();
      console.log("updated task", taskUpdated);
    }

    updateTasksAfterEditing(updatedTask);
    handleClose();
  };

  return (
    <div className="task">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleTaskUpdate()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <div className="content">
        <span>{task.name}</span>
        <span>{task.description}</span>
      </div>
      <button onClick={handleShow}>Edit</button>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TodoTask;
