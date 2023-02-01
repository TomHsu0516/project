import express from "express";
import { Task } from "../entities/task";

const router = express.Router();

router.get("/task", async (req, res) => {
  const users = await Task.find();
  res.send(users);
});

router.post("/task", async (req, res) => {
  const { name, description } = req.body;

  const task = Task.create({
    name: name,
    description: description,
  });

  await task.save();

  return res.json(task);
});

export { router as createTaskRouter };
